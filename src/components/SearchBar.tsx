const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="Search for blog..."
      className="w-full py-1 pl-3 pr-2 bg-transparent border border-slate-500/20 text-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70"
    />
  );
};
export default SearchBar;
