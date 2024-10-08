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
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full py-2 pl-3 pr-2 bg-transparent backdrop-blur-md border border-slate-500/20 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-inset focus:ring-red-400/70"
    />
  );
};
export default SearchBar;
