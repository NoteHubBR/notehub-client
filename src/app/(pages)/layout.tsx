import { Container } from "@/components/template/Container";
import { Desktop } from "@/components/desktop";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadingProvider } from "@/data/contexts/LoadingContext";
import { MenuProvider } from "@/data/contexts/MenuContext";
import { Mobile } from "@/components/mobile";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressBarProvider } from "@/data/contexts/ProgressContext";
import { ScreenProvider } from "@/data/contexts/ScreenContext";
import { ScreenWidthProvider } from "@/data/contexts/ScreenWidthContext";
import { SplashScreen } from "@/components/SplashScreen";
import { ThemeProvider } from "@/data/contexts/ThemeContext";
import { UserFollowingProvider } from "@/data/contexts/UserFollowingContext";
import { UserNotesProvider } from "@/data/contexts/UserNotesContext";
import { UserNotificationsProvider } from "@/data/contexts/UserNotificationsContext";
import { UserPreferencesProvider } from "@/data/contexts/UserPreferencesContext";
import { UserProvider } from "@/data/contexts/UserContext";
import { UserStoreProvider } from "@/data/contexts/UserStoreContext";
import Page from "@/components/template/Page";

const UserProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID ?? "vascodagama"}>
            <UserPreferencesProvider>
                <UserStoreProvider>
                    <UserFollowingProvider>
                        <UserNotesProvider>
                            <UserProvider>
                                <UserNotificationsProvider>
                                    {children}
                                </UserNotificationsProvider>
                            </UserProvider>
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
    return (
        <Providers>
            <ProgressBar />
            <SplashScreen />
            <Container className="flex flex-col">
                <Desktop.Navbar />
                <Mobile.Navbar />
                <div className="h-full flex">
                    <Desktop.Sidebar />
                    <Page className="w-full">
                        {props.children}
                    </Page>
                </div>
            </Container>
        </Providers>
    )
}

export default layout;