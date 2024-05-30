"use client";
import HomePage from "@/pages/HomePage";
import { useRouter } from 'next/navigation'


export default function Home() {
  const verified:boolean = true;
  const router = useRouter();
  if(!verified){
    router.push("/auth");
  }
  return (
    <>
      <HomePage />
    </>
  );
}
