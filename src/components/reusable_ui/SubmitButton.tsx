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
      {pending ? (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        `${children}`
      )}
    </button>
  );
};

export default SubmitButton;
