import Link from "next/link";
import Tags from "./Tags";
import Categories from "./Categories";

const RightSideBar = () => {
  return (
    <div className="sidebar w-[98%] mx-auto lg:h-[95%] lg:mt-16 justify-start flex flex-col px-5 gap-10 lg:gap-20 py-10 lg:py-20">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">Tags</h2>
        <div className="line mb-5"></div>
        <div className="flex flex-wrap gap-5 justify-center items-center">
          <Tags />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">Categories</h2>
        <div className="line"></div>
        <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
          <Categories />
        </div>
      </div>
    </div>
  );
};
export default RightSideBar;
