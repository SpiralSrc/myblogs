import Image from "next/image";
import DashboardImage from "../../../public/pinkroses.webp";

const TopImage = () => {
  return (
    <section className="w-full h-full">
      <div className="relative w-full h-full">
        <Image
          src={DashboardImage}
          placeholder="blur"
          alt="hero banner"
          priority
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-overlay"></div>
      </div>
    </section>
  );
};
export default TopImage;
