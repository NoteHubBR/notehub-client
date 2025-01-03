import { Loading } from "@/components/Loading";
import { LoadingProvider } from "@/data/contexts/LoadingContext";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressBarProvider } from "@/data/contexts/ProgressContext";
import { ThemeProvider } from "@/data/contexts/ThemeContext";
import { UserContextProvider } from "@/data/contexts/UserContext";
import Page from "@/components/template/Page";

const layout = (props: any) => {

    return (
        <ThemeProvider>
            <LoadingProvider>
                <Loading />
                <ProgressBarProvider>
                    <ProgressBar />
                    <UserContextProvider>
                        <Page>
                            {props.children}
                        </Page>
                    </UserContextProvider>
                </ProgressBarProvider>
            </LoadingProvider>
        </ThemeProvider>
    );

};

export default layout;