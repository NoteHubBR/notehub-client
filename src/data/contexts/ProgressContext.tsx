'use client';

import { createContext, useState } from "react";

interface ProgressProps {
    onProgress: boolean;
    setOnProgress: (boolean: boolean) => void;
}

const ProgressContext = createContext<ProgressProps>({} as ProgressProps);

export const ProgressBarProvider = (props: any) => {

    const [onProgress, setOnProgress] = useState<boolean>(false);

    return (
        <ProgressContext.Provider
            value={{
                onProgress,
                setOnProgress
            }}
        >
            {props.children}
        </ProgressContext.Provider>
    )

}

export default ProgressContext;