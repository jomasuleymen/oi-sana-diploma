
import { AlertModal } from "@/components/ui/alert-modal";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import React from "react";

interface DeleteAlertModalProps {
  onDelete: () => Promise<any>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  title: string;
}

const DeleteAlertModal: React.FC<DeleteAlertModalProps> = ({
  onDelete,
  setOpen,
  isOpen,
  title,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onConfirm = useCallback(() => {
    if (!onDelete) return;

    setLoading(true);
    toast.promise(onDelete(), {
      loading: "Deleting...",
      success: () => {
        return "Deleted successfully.";
      },
      error: (err: any) => {
        return err?.message || "Something went wrong, please try again later!";
      },
      finally: () => {
        setOpen(false);
        setLoading(false);
      },
    });
  }, [setOpen, onDelete]);

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      onConfirm={onConfirm}
      loading={loading}
      okText="Delete"
      title={title}
    />
  );
};

export default DeleteAlertModal;
