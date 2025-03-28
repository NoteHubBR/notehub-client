import { Component } from "@/components";
import { Device } from "@/components/devices";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadingProvider } from "@/data/contexts/LoadingContext";
import { MenuProvider } from "@/data/contexts/MenuContext";
import { ProgressBarProvider } from "@/data/contexts/ProgressContext";
import { ScreenProvider } from "@/data/contexts/ScreenContext";
import { ScreenWidthProvider } from "@/data/contexts/ScreenWidthContext";
import { Template } from "@/components/templates";
import { ThemeProvider } from "@/data/contexts/ThemeContext";
import { UserFollowingProvider } from "@/data/contexts/UserFollowingContext";
import { UserHistoryProvider } from "@/data/contexts/UserHistoryContext";
import { UserNotesProvider } from "@/data/contexts/UserNotesContext";
import { UserNotificationsProvider } from "@/data/contexts/UserNotificationsContext";
import { UserPreferencesProvider } from "@/data/contexts/UserPreferencesContext";
import { UserProvider } from "@/data/contexts/UserContext";
import { UserStoreProvider } from "@/data/contexts/UserStoreContext";

const UserProviders = ({ children }: { children: React.ReactNode }) => {
    const GCI = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    return (
        <GoogleOAuthProvider clientId={GCI ?? 'GCI'}>
            <UserPreferencesProvider>
                <UserStoreProvider>
                    <UserFollowingProvider>
                        <UserNotesProvider>
                            <UserHistoryProvider>
                                <UserProvider>
                                    <UserNotificationsProvider>
                                        {children}
                                    </UserNotificationsProvider>
                                </UserProvider>
                            </UserHistoryProvider>
                        </UserNotesProvider>
                    </UserFollowingProvider>
                </UserStoreProvider>
            </UserPreferencesProvider>
        </GoogleOAuthProvider>
    )
}

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ScreenProvider>
            <ScreenWidthProvider>
                <ProgressBarProvider>
                    <LoadingProvider>
                        <UserProviders>
                            <ThemeProvider>
                                <MenuProvider>
                                    {children}
                                </MenuProvider >
                            </ThemeProvider>
                        </UserProviders>
                    </LoadingProvider>
                </ProgressBarProvider>
            </ScreenWidthProvider>
        </ScreenProvider>

    )
}

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