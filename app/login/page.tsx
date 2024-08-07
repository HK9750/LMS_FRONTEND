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
import Loader from "@/components/Loader/Loader";
import { LoginFormSchema } from "@/schemas/LoginSchema";

const Page = () => {
  const [submitError, setSubmitError] = useState<string>("");

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof LoginFormSchema>) => {
    console.log("Submitting form", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg sm:p-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-muted-foreground">
              Login to your account to get started.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
              <Button
                type="submit"
                className="w-full mt-3"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Login"}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href={"/signup"}
              className="underline underline-offset-4"
              prefetch={false}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
