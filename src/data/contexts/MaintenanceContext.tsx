'use client';

import { Component } from '@/components';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Template } from '@/components/templates';
import { useServices } from '../hooks';
import { ThemeProvider } from './ThemeContext';

interface MaintenanceProps { };

const MaintenanceContext = createContext<MaintenanceProps>({} as MaintenanceProps);

export const MaintenanceProvider = (props: any) => {

    const { healthService } = useServices();

    const [isHealthy, setIsHealthy] = useState<boolean | null>(null);

    const checkHealth = useCallback(async () => {
        healthService.check()
            .then(() => setIsHealthy(true))
            .catch(() => setIsHealthy(false));
    }, [])

    useEffect(() => {
        if (isHealthy) return;
        checkHealth();
    }, [])

    if (isHealthy === null) return (
        <ThemeProvider>
            <Component.SplashScreen />
            <Component.ProgressBar />
        </ThemeProvider>
    )

    if (isHealthy) return (
        <MaintenanceContext.Provider
            value={{}}
        >
            {props.children}
        </MaintenanceContext.Provider>
    )

    return <Template.Maintenance checkHealth={checkHealth} />;

}

export default MaintenanceContext;