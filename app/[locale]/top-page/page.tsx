import { getLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { pathnames } from "@/navigation";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/top-page"]['vi'];
    const routeEn = '/en' + pathnames["/top-page"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('top'),
        description: t('top_description')
    };
}

const DynamicTopPage = dynamic(() => import('@/app/components/top-page/TopPage'), {
    ssr: false
});

export default async function Page() {
    const session = await getServerSession(authOptions);
    const locale = await getLocale();
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);
    return (
        <DynamicTopPage locale={locale} roleUser={roleUser} />
    );
}