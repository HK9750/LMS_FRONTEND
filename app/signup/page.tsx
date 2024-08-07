"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { SignUpFormSchema } from "@/schemas/SignupSchema";
import Loader from "@/components/Loader/Loader";
import OTPVerification from "@/components/OTPVerification/OTPVerification";

const Page = () => {
  const [submitError, setSubmitError] = useState<string>("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOTPVerification, setShowOTPVerification] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", name: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmitOtp = () => {
    const newOtp = Object.values(otp).join("");
    console.log(typeof newOtp);
    console.log("Submitting OTP", newOtp);
    setShowOTPVerification(false);
  };

  const onSubmit = async ({
    name,
    email,
    password,
  }: z.infer<typeof SignUpFormSchema>) => {
    console.log("Submitting form", { name, email, password });
    setShowOTPVerification(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg sm:p-8">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <p className="text-muted-foreground">
              Create a new account to get started.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-3"
                disabled={isLoading}
              >
                {!isLoading ? "Sign Up" : <Loader />}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="underline underline-offset-4"
              prefetch={false}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      {showOTPVerification && (
        <OTPVerification
          otp={otp}
          setOtp={setOtp}
          handleSubmitOtp={handleSubmitOtp}
          setShowOTPVerification={setShowOTPVerification}
        />
      )}
    </div>
  );
};

export default Page;
