import dynamic from "next/dynamic";
import BannerComic from "../components/home/BannerComic";
import PopularComic from "../components/home/PopularComic";
import RecentlyUploadedComic from "../components/home/RecentlyUploadedComic";
import TopAreaComic from "../components/home/TopAreaComic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLocale } from "next-intl/server";
import { getEnumValueFromString } from "../utils/HelperFunctions";
const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
  ssr: false
});
export default async function Home() {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();
  const roleUser = getEnumValueFromString(session?.user?.token?.roles);
  return (
    <>
        <ScrollButton />
        <BannerComic roleUser={roleUser}/>
        <PopularComic roleUser={roleUser} locale={locale}/>
        <RecentlyUploadedComic roleUser={roleUser} locale={locale}/>
        <TopAreaComic locale={locale} roleUser={roleUser}/>
    </>
  )
}
