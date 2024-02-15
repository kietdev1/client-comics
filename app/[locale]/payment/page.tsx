import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const DynamicPayment= dynamic(() => import('@/app/components/payment/Payment'), {
    ssr: false
});

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/login');
    }
    return (
        <DynamicPayment />
    );
}