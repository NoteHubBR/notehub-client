import { Header } from "./components/Header";

const layout = (props: any) => {
    return (
        <div className="w-full h-full py-4 px-4 inlg:px-2 inmd:p-0 dark:bg-dark bg-light">
            <Header />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default layout;