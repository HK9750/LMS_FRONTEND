"use client";
import * as React from "react";
import { format } from "timeago.js";
import { AiFillDelete } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from "@/redux/features/user/userApi";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

interface Props {
  type?: string;
}

export default function AllUsers({ type }: Props) {
  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [updateUserRole, { isSuccess: roleSuccess, error: roleError }] =
    useUpdateRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { toast } = useToast();

  React.useEffect(() => {
    if (roleSuccess) {
      toast({
        title: "Success",
        description: "User role updated successfully",
        variant: "default",
      });
      refetch();
    }

    if (deleteSuccess) {
      toast({
        title: "Success",
        description: "User deleted successfully",
        variant: "default",
      });
    }

    if (deleteError) {
      toast({
        title: "Error",
        description: "Error deleting user",
        variant: "destructive",
      });
    }

    if (roleError) {
      toast({
        title: "Error",
        description: "Error updating user role",
        variant: "destructive",
      });
    }
  }, [roleSuccess, roleError, deleteSuccess, deleteError, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;

  let rows = [];

  if (type === "team") {
    const teamMembers =
      data?.users?.filter((user: any) => user.role === "admin") || [];
    rows =
      teamMembers.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        purchasedCourses: user.courses.length,
        joinedAt: format(user.createdAt),
      })) || [];
  } else {
    rows =
      data?.users?.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        purchasedCourses: user.courses.length,
        joinedAt: format(user.createdAt),
      })) || [];
  }

  const handleAddMember = () => {
    const user = data.users.filter((user: any) => user.email === email);
    if (user.length === 0) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
      return;
    }
    updateUserRole({ id: user[0]._id, role: "admin" });
    setOpen(false);
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleDeleteClick = (id: string) => {
    deleteUser({ id });
  };

  const columns = React.useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }: any) => (
          <div className="text-center">{getValue()}</div>
        ),
      },
      {
        accessorKey: "purchasedCourses",
        header: "Purchased Courses",
        cell: ({ getValue }: any) => (
          <div className="text-center">{getValue()}</div>
        ),
      },
      {
        accessorKey: "joinedAt",
        header: "Joined At",
        cell: ({ getValue }: any) => (
          <div className="text-center">{getValue()}</div>
        ),
      },
      {
        id: "emailIcon",
        header: "Email",
        cell: ({ row }: any) => (
          <div
            className="flex justify-center items-center w-full h-full cursor-pointer"
            onClick={() => handleEmailClick(row.getValue("email"))}
          >
            <MdEmail size={20} className="text-blue-600" />
          </div>
        ),
      },
      {
        id: "deleteIcon",
        header: "Delete",
        cell: ({ row }: any) => (
          <div className="flex justify-center items-center w-full h-full cursor-pointer">
            <AlertDialog>
              <AlertDialogTrigger>
                <AiFillDelete size={20} className="text-red-600" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the user.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteClick(row.getValue("id"))}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ),
      },
    ],
    [handleEmailClick, handleDeleteClick]
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-24 relative">
      {type === "team" && (
        <div className="flex justify-end items-center w-[95%]">
          <button
            onClick={() => setOpen(true)}
            className="text-foreground rounded-xl font-semibold bg-accent px-4 py-2 shadow-lg my-4"
          >
            Add Member
          </button>
        </div>
      )}
      <div style={{ minHeight: 500, width: "95%" }}>
        <table className="w-full bg-background text-foreground">
          <thead>
            <tr>
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-2 border-b">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="absolute top-4 left-34 rounded-xl p-6 bg-background text-foreground shadow-lg">
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <label>Enter the email of the user you want to add</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-none text-foreground px-3 py-2 rounded-lg"
              />
            </div>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setOpen(false)}
                className="bg-muted px-4 py-2 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="bg-accent px-4 py-2 rounded-xl font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
