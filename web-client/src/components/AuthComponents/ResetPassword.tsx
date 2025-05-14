"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { PasswordMatchText } from "./SignupForm";

export const ResetPasswordForm = ({ email }: { email: string }) => {
  const query = useSearchParams();
  const token = query.get("token");
  const [resetPassword, setResetPassword] = useState<{
    password: string;
    confirmPassword: string;
  }>({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (
      resetPassword &&
      resetPassword.password !== resetPassword.confirmPassword
    ) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update/password`,
        {
          currentPassword: resetPassword.password,
          newPassword: resetPassword.confirmPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      if (response.status === 200) {
        setResult("success");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          setError(error.response.data.error);
        } else {
          setError("Cloudn't reset password. Please try again");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense>
      {result && result === "success" ? (
        <div className="flex flex-col justify-center">
          <h3 className="text-center">Password changed successfully</h3>

          <Link
            href={"/auth/login"}
            className="font-semibold underline text-center text-neutral-700 dark:text-neutral-300"
          >
            Log in
          </Link>
        </div>
      ) : (
        <>
          <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Change Password
          </h2>
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleResetPassword}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                New Password
              </span>
              <Input
                type="password"
                placeholder="New Password"
                className="mt-1"
                required
                value={resetPassword.password}
                onChange={(e) =>
                  setResetPassword({
                    ...resetPassword,
                    password: e.target.value,
                  })
                }
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                placeholder="Confirm New Password"
                className="mt-1"
                value={resetPassword.confirmPassword}
                onChange={(e) =>
                  setResetPassword({
                    ...resetPassword,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <PasswordMatchText
                password={resetPassword.password}
                confirmPassword={resetPassword.confirmPassword}
              />
            </label>
            {error && (
              <span className="block text-center text-sm text-red-400 dark:text-neutral-300">
                {error}
              </span>
            )}

            <ButtonPrimary type="submit" loading={loading}>
              Continue
            </ButtonPrimary>
          </form>
        </>
      )}
    </Suspense>
  );
};