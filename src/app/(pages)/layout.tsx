import { Loading } from "@/components/Loading";
import { LoadingProvider } from "@/data/contexts/LoadingContext";
import { MenuProvider } from "@/data/contexts/MenuContext";
import { Navbar } from "@/components/navbar";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressBarProvider } from "@/data/contexts/ProgressContext";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/data/contexts/ThemeContext";
import { UserContextProvider } from "@/data/contexts/UserContext";
import Page from "@/components/template/Page";
import { Container } from "@/components/template/Container";

const layout = (props: any) => {

    return (
        <ThemeProvider>
            <LoadingProvider>
                <Loading />
                <ProgressBarProvider>
                    <MenuProvider>
                        <ProgressBar />
                        <UserContextProvider>
                            <Page>
                                <Navbar />
                                <Container className="flex">
                                    <Sidebar />
                                    {props.children}
                                </Container>
                            </Page>
                        </UserContextProvider>
                    </MenuProvider>
                </ProgressBarProvider>
            </LoadingProvider>
        </ThemeProvider>
    );

};

export default layout;