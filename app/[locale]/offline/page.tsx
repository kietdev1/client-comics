import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations('home');
    
    return (
        <article style={{ textAlign: 'center', padding: '9vw' }}>
            <h1>{t('back_soon')}</h1>
            <div>
                <p>{t('sorry')}<a style={{ color: 'var(--color-primary)' }} href="https://www.facebook.com/tonotdievietnam">{t('contact_us')}</a>, {t('dev')} !</p>
                <p>&mdash; Fast Scans Team &mdash;</p>
            </div>
        </article>
    );
}