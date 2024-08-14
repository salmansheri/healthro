"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [error, setError] = useState("");

  const [passKey, setPassKey] = useState("");

  const onClose = () => {
    setIsOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (passKey === process.env.NEXT_PUBLIC_PASSKEY) {
      const encryptedKey = encryptKey(passKey);

      localStorage.setItem("accessKey", encryptedKey);

      setIsOpen(false);

      router.push("/admin");
    } else {
      setError("Invalid Passkey, Please Try again");
    }
  };

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  console.log(encryptedKey);

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (pathname) {
      if (accessKey === process.env.NEXT_PUBLIC_PASSKEY) {
        setIsOpen(false);
        router.push("/admin");
      } else {
        setIsOpen(true);
      }
    }
  }, [encryptedKey, pathname, router]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <X className="cursor-pointer text-rose-600" onClick={onClose} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />

              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="text-rose-600 text-14-regular mt-4 justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePasskey(e)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
