import { getAxiosInstanceAsync } from "@/lib/axios";
import Breadcrumb from "../../../components/comic/Breadcrumb";
import ServerResponse from "@/app/models/common/ServerResponse";
import ComicDetail from "@/app/models/comics/ComicDetail";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLocale, getTranslations } from "next-intl/server";
import ComicMetadata from "@/app/models/comics/ComicMetadata";
import { getEnumValueFromString, getRegionByLocale } from "@/app/utils/HelperFunctions";
import { pathnames } from "@/navigation";
import { isbot } from "isbot";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";
import axios from 'axios';

type Props = {
    params: { comicid: string | null, locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const getComicMeta = unstable_cache(async (comicid: string | null) => {
    const response = await axios.get<ComicMetadata | null | undefined>(process.env.PORTAL_API_URL + `/api/client/ComicApp/${comicid}/metadata`);
    return response.data;
}, [], { revalidate: 10 });

export async function generateMetadata({ params: { comicid, locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;
    const routeVi = pathnames["/comics"]['vi'] + `/${comicid}`;
    const routeEn = '/en' + pathnames["/comics"]['en'] + `/${comicid}`;
    const comicMetadata: ComicMetadata | null | undefined = await getComicMeta(comicid);

    if (comicMetadata) {
        return {
            metadataBase: new URL(baseUrl),
            alternates: {
                canonical: locale === 'vi' ? routeVi : routeEn,
                languages: {
                    'vi': routeVi,
                    'en': routeEn,
                },
            },
            robots: {
                index: comicMetadata.region === getRegionByLocale(locale),
                follow: comicMetadata.region === getRegionByLocale(locale)
            },
            title: t('comic', {
                title: comicMetadata.title,
                lastedChapter: comicMetadata.lastestChapter
            }),
            description: t('comic_description', {
                title: comicMetadata.title,
                lastedChapter: comicMetadata.lastestChapter
            }),
            openGraph: {
                title: t('comic', {
                    title: comicMetadata.title,
                    lastedChapter: comicMetadata.lastestChapter
                }),
                description: t('home'),
                images: [
                    {
                        url: comicMetadata.comicImageUrl,
                        width: 800,
                        height: 600
                    }
                ]
            }
        };
    }

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('comic'),
        description: t('comic_description')
    }
}

const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
    ssr: false
});

const DynamicInfomationComic = dynamic(() => import('@/app/components/comic/InfomationComic'), {
    ssr: true
});

const DynamicCommentComic = dynamic(() => import('@/app/components/comic/CommentComic'), {
    ssr: false
});

const DynamicChapterComic = dynamic(() => import('@/app/components/comic/ChapterComic'), {
    ssr: true
})

const getComic = unstable_cache(async (comicid: string | null) => {
    try {
        const response = await (await getAxiosInstanceAsync()).get<ServerResponse<ComicDetail>>(`/api/client/ComicApp/${comicid}`);
        return response.data.data;
    }
    catch (exception: any) {
        return null;
    }
}, [], { revalidate: 10 });

export default async function Comic({ params }: { params: { comicid: string | null } }) {
    const comic = await getComic(params.comicid);
    const session = await getServerSession(authOptions);
    const locale = await getLocale();
    const isBot = isbot(headers().get('user-agent'));

    const roleUser = getEnumValueFromString(session?.user?.token?.roles);
    return (
        <>
            <ScrollButton />
            <Breadcrumb title={comic?.title} friendlyName={comic?.friendlyName} />
            <DynamicInfomationComic comic={comic} roleUser={roleUser} region={comic?.region} locale={locale} />
            <DynamicChapterComic contents={comic?.contents} locale={locale} roleUser={roleUser} genre={comic?.tags} comicId={comic?.id} region={comic?.region} isBot={isBot} />
            <DynamicCommentComic comicId={comic?.id} collectionId={null} roleUser={roleUser} locale={locale} createdOnUtc={session?.user?.token?.createdOnUtc} />
        </>
    );
}