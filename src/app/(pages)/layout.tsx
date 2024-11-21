import { ProgressBar } from "@/components/ProgressBar";
import { ProgressBarProvider } from "@/data/contexts/ProgressContext";
import { ThemeProvider } from "@/data/contexts/ThemeContext";
import Page from "@/components/template/Page";

const layout = (props: any) => {

    return (
        <ThemeProvider>
            <ProgressBarProvider>
                <ProgressBar />
                <Page>
                    {props.children}
                </Page>
            </ProgressBarProvider>
        </ThemeProvider>
    );

};

export default layout;