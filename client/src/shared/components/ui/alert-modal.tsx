import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { Modal } from "@components/ui/modal";
import { FaSpinner } from "react-icons/fa";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  cancelText?: string;
  okText?: string;
  title?: string;
  description?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  okText,
  cancelText,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title || "Are you sure?"}
      description={description || "This action cannot be undone."}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          <span>{cancelText || "Cancel"}</span>
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          className="space-x-1"
          onClick={onConfirm}
        >
          {loading && <FaSpinner className="animate-spin w-3 h-3" />}
          <span>{okText || "Continue"}</span>
        </Button>
      </div>
    </Modal>
  );
};
