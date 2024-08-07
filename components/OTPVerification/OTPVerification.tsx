"use client";

import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface OTPVerificationProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  handleSubmitOtp: () => void;
  setShowOTPVerification: (show: boolean) => void;
}

const OTPVerification = ({
  otp,
  setOtp,
  handleSubmitOtp,
  setShowOTPVerification,
}: OTPVerificationProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(isOpen) => setShowOTPVerification(isOpen)}
    >
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Verify Your Identity</DialogTitle>
          <DialogClose onClick={() => setShowOTPVerification(false)} />
          <DialogDescription>
            Please enter the 4-digit code sent to your email address.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center gap-2">
            {otp.map((value, index) => (
              <div key={index} className="w-12 h-12">
                <Input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  maxLength={1}
                  pattern="^[0-9]+$"
                  className="w-full h-full text-2xl font-bold text-center border-2 border-muted rounded-md"
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button className="w-full" onClick={handleSubmitOtp}>
            Verify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerification;
