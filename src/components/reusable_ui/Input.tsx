import React from "react";

interface inputProps {
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  name?: string;
  value?: string;
}

const Input = ({ type, placeholder, name, value }: inputProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className="w-full py-2 pl-3 pr-2 text-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70"
    />
  );
};

export default Input;
