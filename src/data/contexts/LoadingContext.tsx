'use client';

import { createContext, useState } from "react";

interface LoadingProps {
    isLoaded: boolean;
    setIsLoaded: (boolean: boolean) => void;
}

const LoadingContext = createContext<LoadingProps>({} as any);

export const LoadingProvider = (props: any) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
            {props.children}
        </LoadingContext.Provider>
    )

}

export default LoadingContext;