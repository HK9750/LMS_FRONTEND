"use client";
import React from "react";
import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/analyticsapi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the interface for the data structure
interface ChartDataItem {
  month: string;
  count: number;
}

const OrderAnalytics: React.FC = () => {
  const { data } = useGetOrderAnalyticsQuery({});

  // Ensure the data is correctly typed
  const chartData: ChartDataItem[] =
    data?.analytics?.last12Months?.map(
      (item: { month: string; count: number }) => ({
        month: item.month,
        count: item.count,
      })
    ) || [];

  return (
    <div className="p-6 bg-card text-card-foreground">
      <div className="space-y-4 mb-4">
        <h1 className="font-bold text-xl text-foreground text-center">
          Order Analytics
        </h1>
        <h2 className="font-semibold text-lg text-muted-foreground text-center">
          Last 12 Months
        </h2>
      </div>
      <div style={{ width: "70%", height: "300px", margin: "auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--grid-stroke-color)"
            />
            <XAxis dataKey="month" stroke="var(--axis-stroke-color)" />
            <YAxis stroke="var(--axis-stroke-color)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-background)",
                borderColor: "var(--tooltip-border)",
              }}
              itemStyle={{
                color: "var(--tooltip-text)",
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--area-stroke)"
              fill="var(--area-fill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderAnalytics;
