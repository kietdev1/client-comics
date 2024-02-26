"use client"
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function MaintenancePage({ locale }: { locale: any }) {
    const t = useTranslations('home');

    useEffect(() => {
    }, []);
    return (
        <>
            <article style={{ textAlign: 'center', padding: '150px' }}>
                <h1>{t('back_soon')}</h1>
                <div>
                    <p>{t('sorry')}<a style={{color: 'var(--color-primary)'}} href="https://www.facebook.com/tonotdievietnam">{t('contact_us')}</a>, {t('dev')} !</p>
                    <p>&mdash; Fast Scans Team &mdash;</p>
                </div>
            </article>
        </>
    );
}