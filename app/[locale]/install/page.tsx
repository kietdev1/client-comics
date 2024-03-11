import { pathnames } from "@/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/install"]['vi'];
    const routeEn = '/en' + pathnames["/install"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('install'),
        description: t('install_description')
    };
}

export default async function Page() {
    const t = await getTranslations('install');

    return (
        <div className="container">
            <article style={{ textAlign: 'center', padding: '9vw' }}>
                <h1>{t('title')}</h1>
                <h2>{t('description')} &nbsp;
                    {process.env.MOBILE_URL && (
                        <>
                            <a style={{ color: 'var(--color-primary)' }} href={process.env.MOBILE_URL}>{t('here')}</a> &nbsp;
                        </>
                    )}
                    <span>{t('description_extra')}</span>
                </h2>

                <p>{t('ios_user')}</p>
                <div className="d-flex justify-content-center">
                    <Image src="/assets/media/install/ios/ios_install_1.webp" alt="ios_install_1" width={585} height={1266} />
                    <Image src="/assets/media/install/ios/ios_install_2.webp" alt="ios_install_2" width={585} height={1266} />
                    <Image src="/assets/media/install/ios/ios_install_3.webp" alt="ios_install_3" width={585} height={1266} />
                    <Image src="/assets/media/install/ios/ios_install_4.webp" alt="ios_install_4" width={585} height={1266} />
                </div>

                <p className="mt-3">{t('android_user')}</p>
                <div className="d-flex justify-content-center">
                    <Image src="/assets/media/install/android/android_install_1.webp" alt="android_install_1" width={540} height={1170} />
                    <Image src="/assets/media/install/android/android_install_2.webp" alt="android_install_2" width={540} height={1170} />
                    <Image src="/assets/media/install/android/android_install_3.webp" alt="android_install_3" width={540} height={1170} />
                    <Image src="/assets/media/install/android/android_install_4.webp" alt="android_install_4" width={540} height={1170} />
                </div>

                <br />
                <div>
                    <p>{t('support')}<a style={{ color: 'var(--color-primary)' }} href="https://www.facebook.com/tonotdievietnam">&nbsp;{t('contact_us')}</a></p>
                    <p>&mdash; Fast Scans &mdash;</p>
                </div>
            </article>
        </div>
    );
} 