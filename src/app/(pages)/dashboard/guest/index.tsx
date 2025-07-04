import { Device } from "@/components/devices";
import { Feed } from "./sections";
import { Hero, Preview, Section } from "./templates";

export const Guest = () => {

    return (
        <main className="h-full w-full">
            <Device.Mobile.Header.MainHeader />
            <Section>
                <Hero>
                    <h1>Feed</h1>
                </Hero>
                <Preview>
                    <Feed />
                </Preview>
            </Section>
        </main>
    )

}