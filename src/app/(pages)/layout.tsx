import { Container } from "@/components/template/Container";
import { LoadingProvider } from "@/data/contexts/LoadingContext";
import { MenuProvider } from "@/data/contexts/MenuContext";
import { Navbar } from "@/components/navbar";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressBarProvider } from "@/data/contexts/ProgressContext";
import { Sidebar } from "@/components/sidebar";
import { SplashScreen } from "@/components/SplashScreen";
import { ThemeProvider } from "@/data/contexts/ThemeContext";
import { UserContextProvider } from "@/data/contexts/UserContext";
import Page from "@/components/template/Page";

const layout = (props: any) => {

    return (
        <ProgressBarProvider>
            <LoadingProvider>
                <UserContextProvider>
                    <ThemeProvider>
                        <MenuProvider>
                            <ProgressBar />
                            <SplashScreen />
                            <Container className="flex flex-col">
                                <Navbar />
                                <div className="h-full flex">
                                    <Sidebar />
                                    <Page className="w-full">
                                        {props.children}
                                    </Page>
                                </div>
                            </Container>
                        </MenuProvider>
                    </ThemeProvider>
                </UserContextProvider>
            </LoadingProvider>
        </ProgressBarProvider>
    );

};

export default layout;