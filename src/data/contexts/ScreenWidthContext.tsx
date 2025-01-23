'use client';

import { createContext, useEffect, useState } from "react";

const ScreenWidthContext = createContext<{ width: number }>({} as any);

export const ScreenWidthProvider = (props: any) => {

    const [width, setWidth] = useState<number>(0);

    useEffect(() => {

        const handleResize = () => {
            return setWidth(window.innerWidth);
        }
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [width]);

    return (
        <ScreenWidthContext.Provider value={{ width }}>
            {props.children}
        </ScreenWidthContext.Provider>
    );

}

export default ScreenWidthContext;