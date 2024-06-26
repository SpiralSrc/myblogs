import React from "react";

interface formProps {
  children: React.ReactNode;
  action?: string | ((formData: FormData) => void) | undefined;
}

const Form = ({ children, action }: formProps) => {
  return (
    <form
      action={action}
      className="w-3/4 mx-auto my-5 border border-red-400/70 rounded-xl flex flex-col gap-4 px-5 pt-16 pb-10"
    >
      {children}
    </form>
  );
};

export default Form;
