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
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  Dialog,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  type?: string;
}

export default function AllUsers({ type }: Props) {
  // Hooks at the top level
  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [
    updateUserRole,
    { isSuccess: isUpdateSuccess, isError: isUpdateError },
  ] = useUpdateRoleMutation();
  const [deleteUser, { isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteUserMutation();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { toast } = useToast();

  const handleAddMember = () => {
    const user = data?.users.find((user: any) => user.email === email);
    if (!user) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
      return;
    }
    updateUserRole({ id: user._id, role: "admin" });
    setOpen(false);
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleDeleteClick = (id: string) => {
    deleteUser({ id });
  };

  const rows = React.useMemo(() => {
    return type === "team"
      ? data?.users
          ?.filter((user: any) => user.role === "admin")
          .map((user: any) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            purchasedCourses: user.courses.length,
            joinedAt: format(user.createdAt),
          })) || []
      : data?.users?.map((user: any) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          purchasedCourses: user.courses.length,
          joinedAt: format(user.createdAt),
        })) || [];
  }, [data, type]);

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
    [handleDeleteClick]
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Error fetching users",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  React.useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "User role updated successfully",
        variant: "default",
      });
      refetch();
    }

    if (isDeleteSuccess) {
      toast({
        title: "Success",
        description: "User deleted successfully",
        variant: "default",
      });
      refetch();
    }

    if (isUpdateError || isDeleteError) {
      toast({
        title: "Error",
        description: "Error occurred while performing the action",
        variant: "destructive",
      });
    }
  }, [
    isUpdateSuccess,
    isDeleteSuccess,
    isUpdateError,
    isDeleteError,
    refetch,
    toast,
  ]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-8 relative">
      {type === "team" && (
        <Button className="my-3" onClick={() => setOpen(true)}>
          Add Member
        </Button>
      )}
      <div style={{ minHeight: 500, width: "100%" }}>
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Enter the email of the user you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <label>Enter the email of the user you want to add</label>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-between items-center gap-2 mt-4">
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMember}>Add</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
