/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ResetPasswordForm } from "@/components/AuthComponents/ResetPassword";
import { Loader } from "@/shared/Loader";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyPage() {
  const query = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const verifyToken = async (token: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-email`,
        { token },
      );
      // console.log(response.data, response.data);
      if (response.status === 200 && response?.data?.data) {
        setEmail(response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Cloudn't verify email. Please try again");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = query.get("token");
    // console.log(token);
    if (!token) {
      setError("Cloudn't verify email. Please try again");
      return;
    }
    verifyToken(token);
  }, [query]);

  return (
    <div className="container mb-24 mt-24 lg:mb-32">
      <div className="max-w-md mx-auto space-y-6">
        {loading ? (
          <Loader />
        ) : error ? (
          <span className="block text-center text-neutral-300">{error}</span>
        ) : (
          <ResetPasswordForm email={email} />
        )}
      </div>
    </div>
  );
}

export default function Page() {
  <Suspense>
    <VerifyPage />
  </Suspense>;
}
