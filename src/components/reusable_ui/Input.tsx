import React from "react";

interface inputProps {
  type: string;
  onChange?: (e: any) => void;
  defaultValue?: string | undefined;
  placeholder: string;
  name: string;
  value?: string;
  required?: boolean | undefined;
}

const Input = ({
  type,
  placeholder,
  required,
  name,
  value,
  defaultValue,
  onChange,
}: inputProps) => {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
      required={required}
      placeholder={placeholder}
      className="w-full py-2 pl-3 pr-2 text-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70"
    />
  );
};

export default Input;
