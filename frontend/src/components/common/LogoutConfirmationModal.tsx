"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LogoutConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function LogoutConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: LogoutConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>

      <AlertDialogContent className="border border-white/10 bg-[#202020] text-white">

        <AlertDialogHeader>

          <AlertDialogTitle className="text-xl">
            Sign Out
          </AlertDialogTitle>

          <AlertDialogDescription className="text-zinc-400">
            Are you sure you want to sign out?

            <br />

            You will need to sign in again to access your CareerPilot dashboard.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel
            className="
              border-white/10
              bg-transparent
              text-white
              hover:bg-white/5
            "
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
            "
          >
            {loading ? "Signing Out..." : "Sign Out"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}