"use client";
import { SignupMethod } from "@/types/SignupMethod";
import { useSession } from "@/hooks/useSession";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutateData } from "@/hooks/useMutate";
import { createToast } from "@/utils/createToast";
import { User } from "@/types/user";

export const PasswordMatchText = (props: {
  password: string;
  confirmPassword: string;
}) => {
  const { password, confirmPassword } = props;

  if (password === "" || confirmPassword === "") {
    return <span></span>;
  }

  if (password !== confirmPassword) {
    return <span className="text-red-500">Passwords do not match</span>;
  }
  return <span className="text-green-500">Passwords match</span>;
};

interface IUserDetails {
  email?: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dob: Date;
  mobile?: string;
  step?: string;
}

export const SignupForm: React.FC<{
  email: string;
  mobile: string;
  signupMethod: SignupMethod;
}> = (props: {
  signupMethod: SignupMethod;
  email?: string;
  mobile?: string;
}) => {
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    email: props.email,
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dob: new Date(),
    mobile: props.mobile,
    step: "1",
  });

  // const [loading, setLoading] = useState(false);

  const { setSession } = useSession();

  const router = useRouter();

  const mutate = useMutateData<User>({
    queryKey: ["signup"],
    endpoint: "/auth/signup",
    body: {
      user: userDetails,
    },
  });

  const createAccount = async () => {
    // const auth = getAuth(app);
    // e.preventDefault();
    // setLoading(true);

    if (props.signupMethod === SignupMethod.EMAIL) {
      if (userDetails.password !== userDetails.confirmPassword) {
        alert("Passwords do not match");
        // setLoading(false);
        return;
      }
      if (userDetails.password.length < 6) {
        // setLoading(false);
        alert("Password must be at least 8 characters");
        return;
      }
    }

    try {
      if (props.signupMethod === SignupMethod.EMAIL && userDetails.email) {
        // Do we need to do this?
        // await createUserWithEmailAndPassword(
        //   auth,
        //   userDetails.email,
        //   userDetails.password
        // );
      }

      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
      //   {
      //     email: userDetails.email,
      //     password: userDetails.password,
      //     firstName: userDetails.firstName,
      //     lastName: userDetails.lastName,
      //     dob: userDetails.dob,
      //     mobile: userDetails.mobile,
      //     method: props.signupMethod,
      //   }
      // );
      // const newUser = response.data.data;
      // setSession(newUser.token, newUser, newUser.user_id);
      mutate
        .mutateAsync()
        .then((response) => {
          if (response?.status) {
            createToast("Account created successfully", "success");
            setTimeout(() => {
              router.push("/auth/login");
            }, 500);
          } else {
            createToast(response?.message || "Error creating account", "error");
          }
        })
        .catch((error) => {
          console.log(error);
          createToast("Error creating account", "error");
        });
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
  };

  return (
    <form
      className="grid grid-cols-1 gap-6"
      // action="#"
      // method="post"
      // onSubmit={createAccount}
    >
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
          First Name
        </span>
        <Input
          type="text"
          placeholder="John"
          className="mt-1"
          value={userDetails.firstName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, firstName: e.target.value })
          }
        />
      </label>
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
          Last Name
        </span>
        <Input
          type="text"
          placeholder="Smith"
          className="mt-1"
          value={userDetails.lastName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, lastName: e.target.value })
          }
        />
      </label>
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
          Date of Birth
        </span>
        <Input
          type="date"
          placeholder="Smith"
          className="mt-1"
          max={new Date().toISOString().split("T")[0]}
          min={new Date(1900, 1, 1).toISOString().split("T")[0]}
          value={
            userDetails.dob
              ? userDetails.dob.toISOString().split("T")[0]
              : undefined
          }
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            setUserDetails({ ...userDetails, dob: selectedDate });
          }}
        />
      </label>

      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200">
          Email address
        </span>
        <Input
          type="email"
          className="mt-1"
          disabled={props.signupMethod === SignupMethod.EMAIL}
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        />
      </label>
      {props.signupMethod === SignupMethod.EMAIL && (
        <>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
            </span>
            <Input
              type="password"
              className="mt-1"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              value={userDetails.password}
            />
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Confirm Password
            </span>
            <Input
              type="password"
              className="mt-1"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  confirmPassword: e.target.value,
                })
              }
              value={userDetails.confirmPassword}
            />
            <PasswordMatchText
              password={userDetails.password}
              confirmPassword={userDetails.confirmPassword}
            />
          </label>
        </>
      )}
      <ButtonPrimary
        onClick={createAccount}
        type="button"
        loading={mutate.isLoading}
      >
        {mutate.isLoading ? "Creating Account..." : "Continue"}
      </ButtonPrimary>
    </form>
  );
};