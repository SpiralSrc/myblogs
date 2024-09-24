import Image from "next/image";
import Spinner from "../../public/loading.gif";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center gr">
      <div className="relative w-20 h-20 flex">
        <Image
          src={Spinner}
          fill
          alt="loading spinner"
          sizes="100%"
          className="object-cover"
        />
      </div>
    </div>
  );
}
