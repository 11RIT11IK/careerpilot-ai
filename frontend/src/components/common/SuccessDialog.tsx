// src/components/common/SuccessDialog.tsx

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const SuccessDialog = ({
  open,
  onOpenChange,
  title,
  description,
  buttonText,
  onButtonClick,
}: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent
			onPointerDownOutside={(e) => e.preventDefault()}
      onEscapeKeyDown={(e) => e.preventDefault()}
			>

        <DialogHeader>

          <DialogTitle>
            {title}
          </DialogTitle>

          <DialogDescription>
            {description}
          </DialogDescription>

        </DialogHeader>

        <DialogFooter>

          <Button onClick={onButtonClick}>
            {buttonText}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
};

export default SuccessDialog;