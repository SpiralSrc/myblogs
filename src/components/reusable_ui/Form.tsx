import React from "react";

interface formProps {
  children: React.ReactNode;
  action?: string | ((formData: FormData) => void) | undefined;
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
}

const Form = ({ children, action, onSubmit }: formProps) => {
  return (
    <form
      action={action}
      onSubmit={onSubmit}
      className="w-3/4 mx-auto my-5 border border-red-400/70 rounded-xl flex flex-col gap-4 px-5 pt-16 pb-10"
    >
      {children}
    </form>
  );
};

export default Form;
