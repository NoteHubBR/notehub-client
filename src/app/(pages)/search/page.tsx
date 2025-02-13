'use client';

import { useSearchParams } from "next/navigation";

const Page = () => {

    const params = useSearchParams();

    return <p>{params.get('q')}</p>
}

export default Page;