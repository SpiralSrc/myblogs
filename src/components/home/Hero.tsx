import Image from "next/image";
import HeroImage from "../../../public/pinkroses.webp";

const Hero = () => {
  return (
    <section className="w-screen h-[25vh]">
      <div className="relative w-full h-full">
        <Image
          src={HeroImage}
          alt="hero banner"
          priority
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
};
export default Hero;
