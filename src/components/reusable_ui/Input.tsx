import React from "react";

interface inputProps {
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
}

const Input = ({ type, placeholder }: inputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="py-3 pl-3 pr-2 text-slate-500 rounded-xl border-0 ring-1 ring-inset ring-red-400/70 focus:ring-1 focus:ring-inset focus:ring-red-400/70"
    />
  );
};

export default Input;
