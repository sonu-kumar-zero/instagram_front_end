"use client";
import HomePage from "@/pages/HomePage";
import { redirect } from 'next/navigation'
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token);
  if (user.id === "" || token === null ) {
    redirect("/auth");
  }
  return (
    <>
      <HomePage />
    </>
  );
}
