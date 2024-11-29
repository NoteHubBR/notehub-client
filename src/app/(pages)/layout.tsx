import { ProgressBar } from "@/components/ProgressBar";
import { ProgressBarProvider } from "@/data/contexts/ProgressContext";
import { ThemeProvider } from "@/data/contexts/ThemeContext";
import { UserContextProvider } from "@/data/contexts/UserContext";
import Page from "@/components/template/Page";

const layout = (props: any) => {

    return (
        <ThemeProvider>
            <ProgressBarProvider>
                <ProgressBar />
                <UserContextProvider>
                    <Page>
                        {props.children}
                    </Page>
                </UserContextProvider>
            </ProgressBarProvider>
        </ThemeProvider>
    );

};

export default layout;