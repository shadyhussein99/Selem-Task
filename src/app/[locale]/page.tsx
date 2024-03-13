import { useTranslations } from "next-intl";
import SearchInput from "./_components/SearchInput";
import Blogs from "./_components/Blogs";

interface MainPageParams {
  params: {
    locale: string;
  };
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default function MainPage({ params, searchParams }: MainPageParams) {
  const t = useTranslations("Index");

  return (
    <main className="flex min-h-screen flex-col items-center px-24 mb-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{t("blogs")}</h2>
      <SearchInput />
      <Blogs
        searchedBlogs={searchParams?.search}
        page={searchParams?.page}
        locale={params.locale}
      />
    </main>
  );
}
