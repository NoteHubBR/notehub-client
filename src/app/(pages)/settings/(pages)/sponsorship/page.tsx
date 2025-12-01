'use client';

import { Header } from "../Header";
import { SponsorCard } from "./card/SponsorCard";
import { Sponsorship } from "@/app/(pages)/dashboard/user/aside/sponsorship";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { user } = useUser();

    if (user) return (
        <section>
            <Header goBack="/settings" title="Patrocínio" />
            {user.sponsor
                ?
                <SponsorCard />
                :
                <Sponsorship
                    isSponsorshipInviteAllowed
                    skipClose
                    className="mt-6 dark:drop-shadow-alpha-l-md drop-shadow-alpha-d-md"
                />
            }
        </section>
    )

}

export default Page;