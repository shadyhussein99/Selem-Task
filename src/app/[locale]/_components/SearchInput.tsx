"use client";

import { useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

function SearchInput() {
  const t = useTranslations("Index");
  const router = useRouter();
  const pathname = usePathname(); // To get the pathname without the parameters
  const searchParams = useSearchParams(); // To get the parameters
  const searchInputRef = useRef(""); // No need for using state to save re-renders as there is no change in ui on changing the input

  const handleSearch = () => {
    const currentURL = new URL(window.location.href);
    const searchParam = searchParams.has("search");

    if (searchParam) {
      currentURL.searchParams.set("search", searchInputRef.current);
      router.replace(currentURL.href, {
        scroll: false,
      });
    } else {
      router.replace(`${pathname}?search=${searchInputRef.current}`, {
        scroll: false,
      });
    }
  };

  const handleClearSearch = () => {
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.delete("search");
    router.replace(currentURL.href, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center space-x-2">
      <input
        type="text"
        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-72"
        onChange={(e) => (searchInputRef.current = e.target.value.trim())} // "trim" to remove the spaces at the beginning and the end
        placeholder={t("searchPlaceholder")}
      />
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
          onClick={handleSearch}
        >
          {t("searchByTitle")}
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-400 focus:outline-none"
          onClick={handleClearSearch}
        >
          {t("clearFilter")}
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
