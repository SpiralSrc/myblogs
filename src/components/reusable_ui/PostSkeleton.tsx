const PostSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-md bg-pink-900/10 backdrop-blur-md overflow-hidden ">
      <div className="shadow p-4 w-full h-full py-5 px-2 flex flex-col justify-center items-center  mx-auto">
        <div className="w-full animate-pulse flex">
          <div className="w-full flex flex-col justify-center items-center  py-2">
            {/* Title Skeleton */}
            <div className="w-[35%] h-8 bg-pink-400/20 rounded-md mb-2"></div>

            {/* Separator */}
            <div className="line mb-3" />

            {/* category */}
            <div className="flex place-self-center w-16 h-6 bg-pink-400/20 rounded mb-3"></div>

            {/* tags */}
            <div className="w-full flex justify-center items-center gap-3">
              <div className="flex place-self-center w-11 h-4 bg-pink-400/20 rounded"></div>
              <div className="flex place-self-center w-11 h-4 bg-pink-400/20 rounded"></div>
              <div className="flex place-self-center w-11 h-4 bg-pink-400/20 rounded"></div>
            </div>

            {/* desc */}
            <div className="w-[95%] mx-auto flex flex-col justify-center items-start gap-2 mt-5">
              <div className="w-full h-4 bg-pink-400/30 rounded"></div>
              <div className="flex place-content-start w-3/4 h-4 bg-pink-400/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostSkeleton;
