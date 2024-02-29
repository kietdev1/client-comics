"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StandonlineChecker() {
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
                if (anchor !== null && anchor.href && anchor.href !== '#' && !isLoading) {
                    setIsLoading(true);

                    // Set Stop loading transition when too longer
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 5000);
                }
                else {
                    setIsLoading(true);

                    // Set fake loading transition with shopee affiliate
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                }

            }, false);

            return () => {
                document.querySelector("body")?.classList.remove("standalone");
                setIsLoading(false);
            }
        }
    }, [pathName, searchParams]);

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