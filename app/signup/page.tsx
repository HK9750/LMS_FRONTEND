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
import { useEffect, useState } from "react";
import { SignUpFormSchema } from "@/schemas/SignupSchema";
import Loader from "@/components/Loader/Loader";
import OTPVerification from "@/components/OTPVerification/OTPVerification";
import { signIn, useSession } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {
  useActivateMutation,
  useRegisterMutation,
  useSocialLoginMutation,
} from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOTPVerification, setShowOTPVerification] =
    useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [
    register,
    {
      isSuccess: isRegistrationSuccess,
      error: registerError,
      data: registerData,
    },
  ] = useRegisterMutation();
  const [
    activate,
    {
      isSuccess: isActivationSuccess,
      error: activationError,
      data: activationData,
    },
  ] = useActivateMutation();
  const [
    socialLogin,
    {
      isSuccess: isSocialLoginSuccess,
      error: socialLoginError,
      data: socialLoginData,
    },
  ] = useSocialLoginMutation();

  const token = useSelector((state: any) => state.auth.activationToken);
  console.log(token);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", name: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmitOtp = async () => {
    const newOtp = otp.join("");
    console.log(newOtp);
    const data = { activationCode: newOtp, activationToken: token };
    await activate(data);
    setShowOTPVerification(false);
  };

  const onSubmit = async ({
    name,
    email,
    password,
  }: z.infer<typeof SignUpFormSchema>) => {
    const data = { name, email, password };
    await register(data);
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

  useEffect(() => {
    if (registerError) {
      if ("data" in registerError) {
        const message = (registerError as any).data.message;
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: message,
        });
      }
    }

    if (isRegistrationSuccess) {
      toast({
        variant: "default",
        title: "Registration Successful",
        description: registerData?.message,
      });
      setShowOTPVerification(true);
    }
  }, [isRegistrationSuccess, registerError, registerData, toast]);

  useEffect(() => {
    if (activationError) {
      if ("data" in activationError) {
        const message = (activationError as any).data.message;
        toast({
          variant: "destructive",
          title: "Activation Failed",
          description: message,
        });
      }
    }

    if (isActivationSuccess) {
      toast({
        variant: "default",
        title: "Activation Successful",
        description: activationData?.message,
      });
      setShowOTPVerification(false);
    }
  }, [isActivationSuccess, activationError, activationData, toast]);

  useEffect(() => {
    if (socialLoginError) {
      if ("data" in socialLoginError) {
        const message = (socialLoginError as any).data.message;
        toast({
          variant: "destructive",
          title: "Social Login Failed",
          description: message,
        });
      }
    }

    if (isSocialLoginSuccess) {
      toast({
        variant: "default",
        title: "Social Login Successful",
        description: socialLoginData?.message,
      });
    }
  }, [isSocialLoginSuccess, socialLoginError, socialLoginData, toast]);

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
                disabled={isLoading || showOTPVerification}
              >
                {!isLoading ? "Sign Up" : <Loader />}
              </Button>
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
