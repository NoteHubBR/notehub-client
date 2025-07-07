import { Device } from "@/components/devices";
import { Feed } from "./sections";
import { Hero, Preview, Section } from "./templates";

export const Guest = () => {

    return (
        <>
            <Device.Mobile.Header.MainHeader />
            <main>
                <Section>
                    <Hero
                        title="Junte-se à comunidade"
                        subtitle="Conecte-se com outros e receba atualizações."
                        message="Juntar-se"
                    />
                    <Preview flip>
                        <Feed />
                    </Preview>
                </Section>
            </main>
        </>
    )

}