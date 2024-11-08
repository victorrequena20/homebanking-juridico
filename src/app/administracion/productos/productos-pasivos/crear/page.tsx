"use client";
import React from "react";
import CreateProductPassiveProvider from "@/modules/productos/creditos/context/CreateProductPassive.provider";
import CreateProductPassive from "@/modules/productos/creditos/CreateProductPassive";

export default function CreateLoanPage() {
  return (
    <CreateProductPassiveProvider>
      <CreateProductPassive />
    </CreateProductPassiveProvider>
  );
}
