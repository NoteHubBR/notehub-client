import { Component } from '@/components';
import { Device } from '@/components/devices';
import { Providers } from './providers';
import { Template } from '@/components/templates';

const layout = (props: any) => {
    const { Desktop, Mobile } = Device;
    return (
        <Providers>
            <Component.ProgressBar />
            <Component.SplashScreen />
            <Template.Container className="flex flex-col">
                <Desktop.Navbar />
                <Mobile.Navbar />
                <div className="h-full flex flex-1">
                    <Desktop.Sidebar />
                    <Template.Page className="w-full">
                        {props.children}
                    </Template.Page>
                </div>
            </Template.Container>
        </Providers>
    )
}

export default layout;