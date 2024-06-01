"use client";
import { Provider } from "react-redux";
import { createStore } from "@/store/store";
import { useRef } from "react";

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createStore();
    
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
