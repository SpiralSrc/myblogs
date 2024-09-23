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
      className="flex place-self-end py-1 px-3 text-sm md:text-base md:py-[5px] md:px-5 rounded-xl border border-pink-400/50 bg-pink-400/30 smooth-effect hover:text-pink-400/60 hover:bg-pink-300/20"
    >
      {pending ? (
        <div className="flex flex-row justify-center items-center gap-3">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
          </div>
          <p>Loading...</p>
        </div>
      ) : (
        `${children}`
      )}
    </button>
  );
};

export default SubmitButton;
