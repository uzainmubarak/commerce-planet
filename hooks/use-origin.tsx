"use client";
import { useEffect, useState } from "react";

const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const [loadingOrigin, setLoadingOrigin] = useState(true);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  useEffect(() => {
    setMounted(true);
    setLoadingOrigin(false)
  }, []);
  
  if(!mounted) return { loadingOrigin, origin: "" };
  return { loadingOrigin, origin };
};
export default useOrigin;
