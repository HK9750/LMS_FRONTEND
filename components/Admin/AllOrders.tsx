"use client";

import * as React from "react";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderapi";
import { format } from "timeago.js";
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

const AllOrders = () => {
  const { isLoading, data } = useGetAllOrdersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  console.log(data);

  const columns = React.useMemo(
    () => [
      { accessorKey: "id", header: "Order ID" },
      { accessorKey: "userId", header: "User ID" },
      { accessorKey: "courseId", header: "Course ID" },
      {
        accessorKey: "placedAt",
        header: "Placed At",
        cell: ({ row }: { row: any }) => (
          <div className="text-center">{row.getValue("placedAt")}</div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }: { row: any }) => (
          <div className="text-center">
            ${(row.getValue("price") / 100).toFixed(2)}
          </div>
        ),
      },
    ],
    []
  );

  const rows = React.useMemo(
    () =>
      data?.orders?.map((order: any) => ({
        id: order._id,
        userId: order.userId,
        courseId: order.courseId,
        placedAt: format(order.createdAt),
        price: order.paymentInfo?.amount,
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

export default AllOrders;
