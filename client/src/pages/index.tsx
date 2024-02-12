import TaskListPage from "@/components/pages/TaskListPage";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <TaskListPage />
}
