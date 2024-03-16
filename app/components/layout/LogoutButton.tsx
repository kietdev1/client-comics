'use client';
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false);
    const onSignOut = () => {
        setIsLoading(true);
        signOut({
            redirect: true
        }).then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userSession');
            sessionStorage.removeItem('isCheckSyncDevice');
        })
    };

    return (
        <>
            {isLoading && <div id="overlay-loading"></div>}
            <button className="anime-btn btn-dark" onClick={onSignOut}>
                <i className="fa fa-sign-out" />
            </button>
        </>
    );
}