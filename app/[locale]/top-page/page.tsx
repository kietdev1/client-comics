import { getLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
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