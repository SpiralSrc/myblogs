import Link from "next/link";
import Tags from "./Tags";
import Categories from "./Categories";

const RightSideBar = () => {
  return (
    <div className="flex flex-col lg:gap-20 pl-5 lg:mt-36">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Tags</h2>
        <div className="flex flex-wrap gap-5">
          <Tags />
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl">Categories</h2>
        <div className="flex flex-wrap gap-5 mt-5">
          <Categories />
        </div>
      </div>
    </div>
  );
};
export default RightSideBar;
