import Device from "@/app/components/profile/Device";
import { ERoleType } from "@/app/models/enums/ERoleType";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const t = await getTranslations('profile');
    const session = await getServerSession(authOptions);

    if (getEnumValueFromString(session?.user?.token?.roles) !== ERoleType.UserPremium &&
        getEnumValueFromString(session?.user?.token?.roles) !== ERoleType.UserSuperPremium) {
        return redirect("/");
    }

    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="/">{t('home_page')}</a></li>
                            <li><a href="/profile">{t('profile')}</a></li>
                            <li><a className="active">{t('devices')}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <Device session={session} />
        </>
    )
}