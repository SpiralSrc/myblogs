import { SignIn } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    // <div className="w-screen h-screen fixed bg-black/80 backdrop-blur-sm top-0 left-0 z-50">
    <div className="wrapper h-[85vh]">
      <div className="w-full h-full flex justify-center items-center">
        <SignIn />
      </div>
    </div>
    //</div>
  );
}
