import { ThemeProvider } from "@/data/context/ThemeContext";

import Page from "@/components/template/Page";

const layout = (props: any) => {
    return (
        <ThemeProvider>
            <Page>{props.children}</Page>
        </ThemeProvider>
    );
};

export default layout;