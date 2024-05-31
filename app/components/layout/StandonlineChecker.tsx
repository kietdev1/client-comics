"use client";
import { ERoleType } from "@/app/models/enums/ERoleType";
import { getEnumValueFromString, getLangByLocale } from "@/app/utils/HelperFunctions";
import { pathnames } from "@/navigation";
import { Session } from "next-auth";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    session: Session | null;
    locale: string;
}

export default function StandonlineChecker({ session, locale }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const isPwa = () => {
        const displayModes = [
            // "fullscreen",
            "standalone",
            // "minimal-ui"
        ];
        return displayModes.some((displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches);
    }

    useEffect(() => {
        if (isPwa()) {
            document.querySelector("body")?.classList.add("standalone");
            setIsLoading(false);

            // Add Loading Status UI when standonline app click to next page
            document.querySelector("body")?.addEventListener('click', function (e: any) {
                // Validate the href using a regular expression (optional and customizable):
                const anchor = e.target?.closest('a');
                if (anchor !== null && anchor.href && !anchor.href.includes('#') && !isLoading) {
                    setIsLoading(true);
                }
                else if (anchor !== null && !isLoading && !anchor.href) {
                    setIsLoading(true);

                    // Set fake loading transition with shopee affiliate
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                }

                // Set Stop loading transition when too longer
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
            }, false);

            return () => {
                document.querySelector("body")?.classList.remove("standalone");
                setIsLoading(false);
            }
        }
    }, [pathName, searchParams]);

    useEffect(() => {
        const roleType = getEnumValueFromString(session?.user?.token?.roles);
        // PWA that we limited all main routes and except Home page on Website.
        if (isPwa() && !pathName.includes('/standalone') &&
            !pathName.includes(pathnames['/login'][getLangByLocale(locale)]) &&
            !pathName.includes(pathnames['/maintenance'][getLangByLocale(locale)]) &&
            !pathName.includes(pathnames['/payment'][getLangByLocale(locale)]) &&
            !pathName.includes(pathnames['/upgrade-package'][getLangByLocale(locale)]) &&
            !pathName.includes(pathnames['/detail-package'][getLangByLocale(locale)])) {
            if (roleType !== ERoleType.UserPremium && roleType !== ERoleType.UserSuperPremium) {
                redirect('/standalone');
            }
        } else if (!isPwa() &&
            pathName !== '/' &&
            pathName !== '/en' &&
            !pathName.includes('/standalone') &&
            !pathName.includes(pathnames['/login'][getLangByLocale(locale)]) &&
            !pathName.includes(pathnames['/maintenance'][getLangByLocale(locale)]) &&
            !pathName.includes(pathnames['/payment'][getLangByLocale(locale)]) &&
            !pathName.includes(pathnames['/upgrade-package'][getLangByLocale(locale)]) &&
            !pathName.includes(pathnames['/detail-package'][getLangByLocale(locale)])) {
            if (roleType !== ERoleType.UserPremium && roleType !== ERoleType.UserSuperPremium) {
                redirect(process.env.clientUrl + pathName ?? '/standalone');
            }
        }
    }, []);

    return (
        <>
            {isLoading &&
                <div id="overlay-loading">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}