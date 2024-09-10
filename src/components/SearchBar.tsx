"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchText: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchText) {
      params.set("query", searchText);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);

    params.delete("query");
  };

  return (
    <input
      type="text"
      placeholder="Search for post..."
      defaultValue={searchParams.get("query")?.toString().trim()}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full py-1 pl-3 pr-2 bg-transparent border border-slate-500/20 text-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70"
    />
  );
};
export default SearchBar;
