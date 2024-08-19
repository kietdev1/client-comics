import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import dynamic from 'next/dynamic'
import { getTranslations, getLocale } from 'next-intl/server';
import Initial from "./Initial";
import Logo from '@/public/assets/media/logo.png';
import Image from "next/image";
import SessionProviderWrapper from "./SessionProviderWrapper";
import StandonlineChecker from "./StandonlineChecker";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { ERoleType } from "@/app/models/enums/ERoleType";

const DynamicLogoutButton = dynamic(() => import('./LogoutButton'), {
    ssr: true
});

const DynamicLanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), {
    ssr: true
})

const DynamicSearchHeader = dynamic(() => import('./SearchHeader'), {
    ssr: true
});

const DynamicFirebase = dynamic(() => import('./Firebase'), {
    ssr: false
})

const DynamicOffsetTimeZoneGlobal = dynamic(() => import('../common/OffsetTimeZoneGlobal'), {
    ssr: true
})

export default async function Header() {
    const session = await getServerSession(authOptions);
    const isLogined = !!session;
    const t = await getTranslations('header');
    const locale = await getLocale();

    return (
        <header className="header style-1">
            <SessionProviderWrapper session={session} Component={<Initial props={session} />} />
            <StandonlineChecker session={session} locale={locale} />
            {(getEnumValueFromString(session?.user?.token?.roles) === ERoleType.UserPremium || getEnumValueFromString(session?.user?.token?.roles) === ERoleType.UserSuperPremium) && <DynamicFirebase />}
            <DynamicOffsetTimeZoneGlobal />
            <div className="container">
                {/* Start Mainmanu Nav */}
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="/">
                        <Image src={Logo} alt="logo" priority />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mynavbar"
                    >
                        <i className="fas fa-bars" />
                    </button>
                    <div className="collapsed navbar-collapse collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto mainmenu">
                            <li className="menu-item-has-children">
                                <a href="/following">{t('following')}</a>
                            </li>
                            <li className="menu-item-has-children">
                                <a
                                    href="#"
                                    className="dropdown-toggle"
                                    id="ranking"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {t('ranking')}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="ranking">
                                    <li>
                                        <a href="/top-page?typePage=" className="active">
                                            {t('top_all')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/top-page?typePage=year">{t('top_year')}</a>
                                    </li>
                                    <li>
                                        <a href="/top-page?typePage=month">{t('top_month')}</a>
                                    </li>
                                    <li>
                                        <a href="/top-page?typePage=day">{t('top_day')}</a>
                                    </li>
                                    <li>
                                        <a href="/top-user">
                                            {t('power')}
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="#">{t('top_follow')}</a>
                                    </li> */}
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a
                                    href="#"
                                    className="dropdown-toggle"
                                    id="explore"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {t('explore')}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="explore">
                                    <li>
                                        <a href="/top-page?typePage=" className="active">
                                            [Fast] Reels
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/search">{t('advanced_search')}</a>
                                    </li>
                                    <li>
                                        <a href="/schedule">{t('schedule')}</a>
                                    </li>
                                    {process.env.MOBILE_URL && (
                                        <li>
                                            <a href="/install">{t('install')}</a>
                                        </li>
                                    )}
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a
                                    href="#"
                                    className="dropdown-toggle"
                                    id="types"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {t('genre')}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="types">
                                    <li>
                                        <a href="/top-page?typePage=manga" className="active">
                                            {t('manga')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/top-page?typePage=manhwa">{t('manhwa')}</a>
                                    </li>
                                    <li>
                                        <a href="/top-page?typePage=manhua">{t('manhua')}</a>
                                    </li>
                                    <li>
                                        <a href="/top-page?typePage=comic">{t('comic')}</a>
                                    </li>
                                    <li>
                                        <a href="/top-page?typePage=bande_dessinée">{t('bande_dessinée')}</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <DynamicLanguageSwitcher locale={locale} />
                            </li>
                        </ul>
                        <DynamicSearchHeader />
                        {!isLogined ? (
                            <div className="d-flex right-nav">
                                <a href="/login" className="anime-btn btn-dark">
                                    {t('login')}
                                </a>
                            </div>
                        ) : (
                            <div className="d-flex right-nav">
                                <a href="/profile" className="anime-btn btn-dark border-change me-2 text-avt">
                                    {session.user?.name}
                                </a>
                                <DynamicLogoutButton />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}