import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="wrapper h-[85vh]">
      <div className="w-full h-full flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
}
