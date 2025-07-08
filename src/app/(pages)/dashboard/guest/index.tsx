import { Device } from "@/components/devices";
import { Hero, Next, Preview, Previous, Section } from "./templates";
import { sections } from "./sections";
import { useEffect, useRef, useState } from "react";

export const Guest = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLElement>(null);

    const scrollToIndex = (newIndex: number) => setCurrentIndex(newIndex);

    const scrollToNextIndex = () => scrollToIndex(currentIndex + 1);

    const scrollToPreviousIndex = () => scrollToIndex(currentIndex - 1);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const target = container.children[currentIndex] as HTMLElement;
            container.scrollTo({ behavior: "smooth", top: 0, left: target.offsetLeft });
        }
    }, [currentIndex])

    return (
        <>
            <Device.Mobile.Header.MainHeader />
            <main ref={containerRef} className="no-scrollbar overflow-x-scroll flex">
                {sections.map((section, index) => (
                    <Section key={index}>
                        <Hero
                            title={section.title}
                            subtitle={section.subtitle}
                            message={section.message}
                        />
                        <Preview flip={section.flip}>
                            {section.child}
                        </Preview>
                        <Previous index={currentIndex} onClick={scrollToPreviousIndex} />
                        <Next indexes={sections.length} index={currentIndex} onClick={scrollToNextIndex} />
                    </Section>
                ))}
            </main>
        </>
    )

}