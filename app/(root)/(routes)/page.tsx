"use client";
import { useStoreModel } from "@/hooks/use-store-model";
import { useEffect } from "react";

const SetupPage = () => {
  const isOpen = useStoreModel((state) => state.isOpen);
  const onOpen = useStoreModel((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
