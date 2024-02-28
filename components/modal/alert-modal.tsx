"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/modal/modal";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const AlertModal: React.FC<Props> = ({ open, onClose, onConfirm, loading }) => {
  const [mounted, setmounted] = useState(false);
  useEffect(() => {
    setmounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="If you delete this store, all the data will be lost. This action cannot be undone."
      isOpen={open}
      onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
