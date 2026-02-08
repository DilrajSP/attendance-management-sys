"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/app/actions/changePassword";

// 1. Validation Schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: PasswordFormValues) => {
    startTransition(async () => {
      try {
        const result = await changePassword(
          values.currentPassword,
          values.newPassword,
        );
        if (result?.error) {
          toast.error(result.error);
          return;
        }
        toast.success("Password updated successfully!");
        // clear the form
        reset();

        setTimeout(async () => {
          await signOut({ callbackUrl: "/" });
        }, 1500);
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <Card className="w-full border-none shadow-none sm:shadow-sm max-w-md mx-auto">
      <CardHeader className="space-y-1 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl text-center">
          Security
        </CardTitle>
        <CardDescription className="text-center">
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              {...register("currentPassword")}
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              className={errors.currentPassword ? "border-destructive" : ""}
              disabled={isPending}
            />
            {errors.currentPassword && (
              <p className="text-xs text-destructive">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                {...register("newPassword")}
                id="newPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className={`pr-10 ${errors.newPassword ? "border-destructive" : ""}`}
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-destructive">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className={errors.confirmPassword ? "border-destructive" : ""}
              disabled={isPending}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base sm:h-10 sm:text-sm"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
