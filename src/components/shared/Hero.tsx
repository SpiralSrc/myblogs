import Image from "next/image";
import HeroImage from "../../../public/pinkroses.webp";

const Hero = () => {
  return (
    <section className="w-screen h-[35vh] xl:h-[40vh]">
      <div className="relative w-full h-full">
        <Image
          src={HeroImage}
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
export default Hero;
