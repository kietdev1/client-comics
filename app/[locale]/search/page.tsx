import Search from "@/app/components/search/Search";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { getLocale, getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('search'),
        description: t('search_description')
    };
}

export default async function Page() {
    const t = await getTranslations('search');
    const locale = await getLocale();
    const session = await getServerSession(authOptions);
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);

    return (
        <>
            {/* <!--=====================================-->
            <!--=      Breadcrumb Area Start        =-->
            <!--=====================================--> */}
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a className="active">{t('search_list')}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <Search locale={locale} roleUser={roleUser}/>
        </>
    );
}