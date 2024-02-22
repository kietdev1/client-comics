"use client"
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { parseJsonFromString } from "@/lib/json";
import { checkRoleUpdate, getTokenFromSessionServer } from "@/lib/services/client/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Initial({ props }: { props: Session | null }) {
    const { update } = useSession();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (props?.user && !token) {
            getTokenFromSessionServer();
            localStorage.setItem('token', props.user.token?.apiToken ?? '');
        }

        const isCheckRoleChanges = parseJsonFromString<boolean | null>(sessionStorage.getItem("isCheckRoleChanges"));
        if (!isCheckRoleChanges && token) {
            checkRoleUpdate().then((roleType) => {
                const currentRoleType = getEnumValueFromString(props?.user?.token?.roles);
                if (currentRoleType != roleType) {
                    update();
                }
                sessionStorage.setItem("isCheckRoleChanges", JSON.stringify(true));
            }).catch(() => { });
        }
    }, [props]);

    return (
        <></>
    );
}