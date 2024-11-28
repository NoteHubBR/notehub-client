import { ProgressBar } from "@/components/ProgressBar";
import { ProgressBarProvider } from "@/data/contexts/ProgressContext";
import { ThemeProvider } from "@/data/contexts/ThemeContext";
import Page from "@/components/template/Page";
import { UserContextProvider } from "@/data/contexts/UserContext";

const layout = (props: any) => {

    return (
        <UserContextProvider>
            <ThemeProvider>
                <ProgressBarProvider>
                    <ProgressBar />
                    <Page>
                        {props.children}
                    </Page>
                </ProgressBarProvider>
            </ThemeProvider>
        </UserContextProvider>
    );

};

export default layout;