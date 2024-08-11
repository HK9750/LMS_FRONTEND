"use client";
import Home from "@/components/LandingPage/Home";
import { useSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const { user } = useSelector((state: any) => state.user);
  console.log(user);
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <Home />
    </>
  );
};

export default page;
