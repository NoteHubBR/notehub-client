'use client';

import { Main } from "./main";
import { Template } from "@/components/templates";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { isMounted, user, token } = useUser();

    const sessionId = useSearchParams().get('session_id');

    if (!isMounted) return <></>;

    if (user && token && sessionId) return <Main token={token} param={sessionId} />

    return <Template.Forbidden />;

}

export default Page;