"use client";
import { useEffect, useState } from "react";

export default function StandonlineChecker() {
    const [isLoading, setIsLoading] = useState(false);

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

            // Add Loading Status UI when standonline app click to next page
            document.querySelector("body")?.addEventListener('click', function (e: any) {
                var anchor = e.target?.closest('a');
                if (anchor !== null && !isLoading) {
                    setIsLoading(true);
                }
            }, false);

            document.addEventListener('unload', () => {
                setIsLoading(false);
            });

            return () => {
                document.querySelector("body")?.classList.remove("standalone");
                document.querySelector("body")?.removeEventListener('click', function (e: any) {
                    setIsLoading(false);
                });

                document.removeEventListener('unload', () => { });
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