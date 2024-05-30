"use client";
import HomePage from "@/pages/HomePage";
import { redirect } from 'next/navigation'
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  if (user._id === "") {
    redirect("/auth");
  }
  return (
    <>
      <HomePage />
    </>
  );
}
