"use client";
import { useAppleLogin } from "@/hooks/providers/useAppleLogin";
import { useFacebookLogin } from "@/hooks/providers/useFacebookLogin";
import { useGoogleLogin } from "@/hooks/providers/useGoogleLogin";
import { useSession } from "@/hooks/useSession";
import appleSvg from "@/images/Apple.svg";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { SignupMethod } from "@/types/SignupMethod";
import { MobileInput } from "@/components/MobileInput";
import { SignupForm } from "@/components/AuthComponents/SignupForm";

export default function Page() {
  const { googleLogin, isLoading: googleLoggingin } = useGoogleLogin();
  const { appleLogin, isLoading: appleLoading } = useAppleLogin();
  const { facebookLogin, isLoading: facebookLoading } = useFacebookLogin();
  const [userEmail, setUserEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupMethod, setSignupMethod] = useState<SignupMethod>(
    SignupMethod.EMAIL,
  );
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const { setSession } = useSession();

  const checkEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup/check-email`,
        {
          email: userEmail,
        },
      );
      if (response.status === 200) {
        setShowSignupForm(true);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 409) {
        router.push("/auth/login");
      } else {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const checkMobile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/send-otp`,
        {
          mobile: `+${mobile}`,
        },
      );
      if (response.status === 200) {
        setShowVerifyOtp(true);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
    setLoading(false);
  };

  const verifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`,
        {
          mobile: `+${mobile}`,
          otp,
        },
      );
      // check if user already exists
      if (response.data.data?.token) {
        setSession(
          response.data.data.token,
          response.data.data,
          response.data.data.user_id,
        );
        setTimeout(() => {
          router.push("/");
        }, 200);
        return;
      }
      if (response.status === 200) {
        setShowSignupForm(true);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {showSignupForm ? (
            <SignupForm
              email={userEmail}
              mobile={`+${mobile}`}
              signupMethod={signupMethod}
            />
          ) : (
            <>
              <div className="grid gap-3">
                <button
                  className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                  onClick={() => googleLogin()}
                  disabled={googleLoggingin}
                >
                  <Image
                    className="flex-shrink-0"
                    src={googleSvg}
                    alt="Continue with Google"
                  />
                  <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                    {googleLoggingin ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-r-2 border-gray-900 rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      "Continue with Google"
                    )}
                  </h3>
                </button>
                <button
                  className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                  onClick={() => facebookLogin()}
                  disabled={facebookLoading}
                >
                  <Image
                    className="flex-shrink-0"
                    src={facebookSvg}
                    alt="Continue with Facebook"
                  />
                  <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                    {facebookLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-r-2 border-gray-900 rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      "Continue with Facebook"
                    )}
                  </h3>
                </button>
                <button
                  className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                  onClick={() => appleLogin()}
                  disabled={appleLoading}
                >
                  <Image
                    className="flex-shrink-0"
                    src={appleSvg}
                    alt="Continue with Apple"
                  />
                  <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                    {appleLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-r-2 border-gray-900 rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      "Continue with Apple"
                    )}
                  </h3>
                </button>
                {signupMethod === SignupMethod.EMAIL ? (
                  <button
                    className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                    onClick={() => setSignupMethod(SignupMethod.MOBILE)}
                  >
                    <Image
                      className="flex-shrink-0"
                      src={appleSvg}
                      alt="Continue with Apple"
                    />
                    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                      Continue with Mobile
                    </h3>
                  </button>
                ) : (
                  <button
                    className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                    onClick={() => setSignupMethod(SignupMethod.EMAIL)}
                  >
                    <Image
                      className="flex-shrink-0"
                      src={appleSvg}
                      alt="Continue with Apple"
                    />
                    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                      Continue with Email
                    </h3>
                  </button>
                )}
              </div>
              {/* OR */}
              <div className="relative text-center">
                <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                  OR
                </span>
                <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
              </div>
              {/* FORM */}
              {signupMethod === SignupMethod.EMAIL ? (
                <form
                  className="grid grid-cols-1 gap-6"
                  action="#"
                  method="post"
                  onSubmit={checkEmail}
                >
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Email address
                    </span>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      className="mt-1"
                      onChange={(e) => setUserEmail(e.target.value)}
                      value={userEmail}
                    />
                  </label>
                  <ButtonPrimary type="submit" loading={loading}>
                    Continue
                  </ButtonPrimary>
                </form>
              ) : (
                <form
                  className="grid grid-cols-1 gap-6"
                  action="#"
                  method="post"
                  onSubmit={showVerifyOtp ? verifyOtp : checkMobile}
                >
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Mobile Number
                    </span>
                    <MobileInput
                      phone={mobile}
                      country="us"
                      onChange={setMobile}
                    />
                  </label>
                  {showVerifyOtp && (
                    <label className="block">
                      <span className="text-neutral-800 dark:text-neutral-200">
                        OTP
                      </span>
                      <Input
                        type="number"
                        placeholder="Enter OTP"
                        className="mt-1"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                      />
                    </label>
                  )}
                  <ButtonPrimary type="submit" loading={loading}>
                    Continue
                  </ButtonPrimary>
                </form>
              )}
            </>
          )}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account?
            <Link href="/auth/login" className="font-semibold underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
