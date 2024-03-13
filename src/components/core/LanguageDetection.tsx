"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

function LanguageDetection() {
  const t = useTranslations("Index");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const localization = useLocale();
  const [displayLanguages, setDisplayLanguages] = useState(false);

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
        onClick={() => setDisplayLanguages((prev) => !prev)}
      >
        {localization === "en" ? t("english") : t("arabic")}
      </button>

      {displayLanguages && (
        <ul className="absolute bg-white shadow-md rounded-md py-2 px-3 mt-1">
          <li className="mb-1">
            <Link
              href={`/en${pathname.replace(/\/(en|ar)/, "")}?${searchParams}`}
              className="text-gray-700 hover:text-blue-500"
            >
              {t("english")}
            </Link>
          </li>
          <li>
            <Link
              href={`/ar${pathname.replace(/\/(en|ar)/, "")}?${searchParams}`}
              className="text-gray-700 hover:text-blue-500"
            >
              {t("arabic")}
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default LanguageDetection;
