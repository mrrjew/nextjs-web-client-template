"use client";

import { formFieldInitialStateType } from "@/types/types";
import { useState, ChangeEvent } from "react";

const useFormFields = (initialState: formFieldInitialStateType) => {
  const [input, setInput] = useState<formFieldInitialStateType>(initialState);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return { input, setInput, handleInputChange };
};

export default useFormFields;
