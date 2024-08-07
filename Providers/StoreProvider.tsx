"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
