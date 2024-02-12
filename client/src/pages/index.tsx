import { Inter } from "next/font/google";
import TaskListPage from "./components/pages/TaskListPage";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <TaskListPage />
}
