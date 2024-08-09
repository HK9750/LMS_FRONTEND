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
import { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import { LoginFormSchema } from "@/schemas/LoginSchema";
import { signIn, useSession } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {
  useLoginMutation,
  useSocialLoginMutation,
} from "@/redux/features/auth/authApi";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const [
    login,
    { isSuccess: isLoginSuccess, error: LoginError, data: LoginData },
  ] = useLoginMutation();

  const [
    socialLogin,
    {
      isSuccess: isSocialLoginSuccess,
      error: SocialLoginError,
      data: SocialLoginData,
    },
  ] = useSocialLoginMutation();

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof LoginFormSchema>) => {
    try {
      await login({ email, password });
    } catch (error) {
      setSubmitError("Login failed. Please try again.");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (session && session.user) {
      toast({
        variant: "default",
        title: `Already Signed In`,
        description: `You are already signed in with ${provider}. Redirecting...`,
      });
      router.push("/");
      return;
    }

    await signIn(provider, { callbackUrl: "/" });

    if (session && session.user) {
      const { user } = session;
      const avatarBase64 = await fetchAvatarBase64(user.image || "");

      const socialLoginData = {
        name: user.name,
        email: user.email,
        avatar: avatarBase64,
      };

      await socialLogin(socialLoginData);
    }
  };

  const fetchAvatarBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject("Failed to convert image to base64");
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to fetch avatar image:", error);
      return "";
    }
  };

  useEffect(() => {
    if (LoginError) {
      const message = (LoginError as any).data.message || "Login failed";
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: message,
      });
    }

    if (isLoginSuccess) {
      toast({
        variant: "default",
        title: "Login Successful",
        description: LoginData?.message,
      });
    }
  }, [isLoginSuccess, LoginError, LoginData, toast]);

  useEffect(() => {
    if (SocialLoginError) {
      const message =
        (SocialLoginError as any).data.message || "Social Login failed";
      toast({
        variant: "destructive",
        title: "Social Login Failed",
        description: message,
      });
    }

    if (isSocialLoginSuccess) {
      toast({
        variant: "default",
        title: "Social Login Successful",
        description: SocialLoginData?.message,
      });
    }
  }, [isSocialLoginSuccess, SocialLoginError, SocialLoginData, toast]);

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
              {submitError && (
                <p className="text-red-600 text-center mt-2">{submitError}</p>
              )}
            </form>
          </Form>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("github")}
            >
              <FaGithub className="mr-2" />
              Sign in with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("google")}
            >
              <FaGoogle className="mr-2" />
              Sign in with Google
            </Button>
          </div>
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
