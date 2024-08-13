import React from "react";
import OrderAnalytics from "@/components/Analytics/OrderAnalytics";
import UserAnalytics from "@/components/Analytics/UserAnalytics";
import CourseAnalytics from "../Analytics/CourseAnalytics";

const DashboardHero = () => {
  return (
    <>
      <CourseAnalytics />
      <UserAnalytics />
      <OrderAnalytics />
    </>
  );
};

export default DashboardHero;
