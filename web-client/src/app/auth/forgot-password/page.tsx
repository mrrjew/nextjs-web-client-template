"use client";

import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import axios from "axios";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const sendVerificationEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
        { email, method: "custom_email" },
      );
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setError("Cloudn't send verification mail. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-24 h-[90vh]">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-red block text-center">{error}</span>
        {success ? (
          <span className="block text-center">
            Verification email sent successfully
          </span>
        ) : (
          <>
            <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Forgot Password
            </h2>
            <form
              className="grid grid-cols-1 gap-6"
              action="#"
              method="post"
              onSubmit={sendVerificationEmail}
            >
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Enter your email address
                </span>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="mt-1"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <ButtonPrimary type="submit" loading={loading}>
                Continue
              </ButtonPrimary>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
