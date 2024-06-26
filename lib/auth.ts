import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import getAxiosInstance from "./axios";
import ServerResponse from "@/app/models/common/ServerResponse";
import ClientAuthenticateResponse from "@/app/models/auth/ClientAuthenticateResponse";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30, // 30 Days
    },
    callbacks: {
        async signIn({ user, profile }) {
            const userProfile: any = profile;
            const response = await getAxiosInstance(process.env.IDENTITY_API_URL).post<ServerResponse<ClientAuthenticateResponse>>('api/account/client-authenticate', {
                providerAccountId: user?.id,
                name: user?.name,
                email: user?.email,
                image: user?.image,
                region: userProfile?.locale,
                emailVerified: userProfile?.email_verified ?? false
            });
            if (response.status === 200) {
                user.name = response.data.data?.fullName;
                user.apiToken = response.data.data?.jwtToken;
                user.roles = response.data.data?.roles;
                user.expriedRoleDate = response.data.data?.expriedRoleDate;
                user.createdOnUtc = response.data.data?.createdOnUtc;
                return true;
            }
            return false;
        },
        async jwt({ token, account, user, trigger }) {
            if (trigger === "update") {
                const response = await getAxiosInstance(process.env.IDENTITY_API_URL).get<ServerResponse<{ role?: string | null, expriedRoleDate?: Date | null }>>('api/user/new-subscription', {
                    headers: {
                        'Authorization': `Bearer ${token.apiToken}`
                    }
                })
                return {
                    ...token,
                    roles: response.data.data?.role,
                    expriedRoleDate: response.data.data?.expriedRoleDate
                } as JWT
            }

            if (account) {
                token.googleToken = account.id_token;
                token.apiToken = user.apiToken;
                token.roles = user.roles;
                token.expriedRoleDate = user.expriedRoleDate;
                token.createdOnUtc = user.createdOnUtc;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.token = token;
            return session;
        },
    },
    // Enable debug messages in the console if you are having problems
    debug: false
};
