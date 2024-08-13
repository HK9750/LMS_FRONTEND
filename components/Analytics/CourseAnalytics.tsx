"use client";
import React from "react";
import { useGetCourseAnalyticsQuery } from "@/redux/features/analytics/analyticsapi";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Define the interface for the TriangleBarProps to avoid undefined values.
interface TriangleBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

// Define an interface for the data structure
interface ChartDataItem {
  month: string;
  count: number;
}

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

// A utility function to generate the path for the TriangleBar shape
const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar: React.FC<TriangleBarProps> = (props) => {
  const { fill, x = 0, y = 0, width = 0, height = 0 } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CourseAnalytics: React.FC = () => {
  const { data } = useGetCourseAnalyticsQuery({});

  const chartData: ChartDataItem[] =
    data?.analytics?.last12Months?.map((item: any) => ({
      month: item.month,
      count: item.count,
    })) || [];
  console.log(chartData);

  return (
    <div className="p-6 bg-card text-card-foreground">
      <div className="space-y-4 mb-4">
        <h1 className="font-bold text-xl text-foreground text-center">
          Course Analytics
        </h1>
        <h2 className="font-semibold text-lg text-muted-foreground text-center">
          Last 12 Months
        </h2>
      </div>
      <div style={{ width: "70%", height: "300px", margin: "auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--axis-stroke-color)"
            />
            <XAxis dataKey="month" stroke="var(--axis-stroke-color)" />
            <YAxis stroke="var(--axis-stroke-color)" />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="var(--line-stroke)"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseAnalytics;
