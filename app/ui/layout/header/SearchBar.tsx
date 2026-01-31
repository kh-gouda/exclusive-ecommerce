import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { poppins } from "@shared/fonts";

export default function SearchBar() {
  return (
    <form className="relative">
      <input
        className={`w-60.75 h-9.5 py-1.75 pl-5 pr-3 bg-gray-bg rounded-sm placeholder:${poppins.className} placeholder:text-xs`}
        type="search"
        id="search"
        name="search"
        placeholder="What are you looking for?"
      />
      <MagnifyingGlassIcon
        className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        role="button"
      />
    </form>
  );
}
