"use client";
import HomePage from "@/pages/HomePage";
import { redirect } from 'next/navigation'
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hooks";


export default function Home() {
  const user = useAppSelector((state: RootState) => state.user.user);
  const token = useAppSelector((state: RootState) => state.user.token);
  if (user.id === "" || token === null ) {
    redirect("/auth");
  }
  return (
    <>
      <HomePage />
    </>
  );
}
