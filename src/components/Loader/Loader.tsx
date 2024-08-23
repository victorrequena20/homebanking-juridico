"use client";
import React, { useEffect } from "react";
import { ILoaderProps } from "./LoaderProps";

export default function Loader({ size, color }: ILoaderProps) {
  React.useEffect(() => {
    async function getLoader() {
      const { dotPulse } = await import("ldrs");
      dotPulse.register();
    }
    getLoader();
  }, []);
  return <l-dot-pulse size={size || "24"} speed="1.3" color={color || "white"}></l-dot-pulse>;
}
