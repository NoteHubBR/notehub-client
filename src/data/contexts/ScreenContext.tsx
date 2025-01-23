'use client';

import { createContext, useEffect, useState } from "react";

interface ScreenProps {
    onDesktop: boolean;
    onMobile: boolean;
}

const ScreenContext = createContext<ScreenProps>({} as any);

export const ScreenProvider = (props: any) => {

    const [state, setState] = useState<ScreenProps>({
        onDesktop: false,
        onMobile: false
    });

    useEffect(() => {

        const screen = window.innerWidth;

        return setState({ onDesktop: screen > 768, onMobile: screen <= 768 });

    }, []);

    return (
        <ScreenContext.Provider value={{ onDesktop: state.onDesktop, onMobile: state.onMobile }}>
            {props.children}
        </ScreenContext.Provider>
    );

}

export default ScreenContext;