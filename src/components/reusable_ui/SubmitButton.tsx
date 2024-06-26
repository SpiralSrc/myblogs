"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const SubmitButton = ({ children, onClick }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className="flex place-self-end py-2 px-5 mt-5 rounded-xl border border-red-400/70 bg-red-400/70 transition-all hover:text-red-400/70 hover:bg-red-200"
    >
      {pending ? "" : ""}
      {children}
    </button>
  );
};

export default SubmitButton;
