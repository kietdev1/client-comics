import dynamic from "next/dynamic";

const DynamicTopUserPage = dynamic(() => import('@/app/components/top-user/TopUserPage'), {
    ssr: false
});

export default async function Page() {
    return (
        <DynamicTopUserPage />
    );
}