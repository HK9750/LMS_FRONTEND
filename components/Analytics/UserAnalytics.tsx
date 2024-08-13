"use client";
import React from "react";
import { useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsapi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define the interface for the data structure
interface ChartDataItem {
  month: string;
  count: number;
}

const UserAnalytics: React.FC = () => {
  const { data } = useGetUserAnalyticsQuery({});

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
          User Analytics
        </h1>
        <h2 className="font-semibold text-lg text-center text-muted-foreground">
          Last 12 Months
        </h2>
      </div>
      <div style={{ width: "70%", height: "300px", margin: "auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
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
            <Legend
              wrapperStyle={{
                color: "var(--legend-text)",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--line-stroke)"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalytics;
