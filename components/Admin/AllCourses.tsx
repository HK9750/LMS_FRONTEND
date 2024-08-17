"use client";

import * as React from "react";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/course/courseapi";
import { format } from "timeago.js";
import { AiFillDelete } from "react-icons/ai";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdEdit } from "react-icons/md";
import Link from "next/link";

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
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AllCourses = () => {
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, isError }] = useDeleteCourseMutation();
  const { toast } = useToast();

  React.useEffect(() => {
    if (isSuccess) {
      refetch();
      toast({
        title: "Success",
        description: "Course deleted successfully",
        variant: "default",
      });
    }

    if (isError) {
      toast({
        title: "Error",
        description: "Error deleting course",
        variant: "destructive",
      });
    }
  }, [isSuccess, isError, refetch, toast]);

  const handleDeleteClick = React.useCallback(
    (id: string) => {
      deleteCourse({ id });
    },
    [deleteCourse]
  );

  const columns = React.useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "title", header: "Course Title" },
      {
        accessorKey: "ratings",
        header: "Ratings",
        cell: ({ row }: { row: any }) => (
          <div className="text-center">{row.getValue("ratings")}</div>
        ),
      },
      {
        accessorKey: "purchased",
        header: "Purchased",
        cell: ({ row }: { row: any }) => (
          <div className="text-center">{row.getValue("purchased")}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }: { row: any }) => (
          <div className="text-center pl-4">{row.getValue("createdAt")}</div>
        ),
      },
      {
        id: "edit",
        header: "Edit",
        cell: ({ row }: { row: any }) => (
          <Link
            href={`/dashboard/editcourse/${row.getValue("id")}`}
            className="flex justify-center items-center w-full h-full"
          >
            <MdEdit size={20} />
          </Link>
        ),
      },
      {
        id: "deleteIcon",
        header: "Delete",
        cell: ({ row }: { row: any }) => (
          <div className="flex justify-center items-center w-full h-full cursor-pointer">
            <AlertDialog>
              <AlertDialogTrigger>
                <AiFillDelete size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent className="dark:bg-background">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the course and remove their data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className=""
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

  const rows = React.useMemo(
    () =>
      data?.courses?.map((course: any, index: number) => ({
        id: course._id,
        title: course.name,
        ratings: course.ratings,
        purchased: course.purchased,
        createdAt: format(course.createdAt),
      })) || [],
    [data]
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Table>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default AllCourses;
