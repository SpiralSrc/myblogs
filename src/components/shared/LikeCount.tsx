const LikeCount = ({ count }: any) => {
  return (
    <div className="flex justify-center items-center text-sm gap-1">
      <span className="text-sm">{count}</span>
      Likes
    </div>
  );
};
export default LikeCount;
