import { Header } from "./components/Header";

const layout = (props: any) => {
    return (
        <div className="w-full h-full py-4 px-4 inlg:px-2 inmd:p-0 flex flex-col gap-4 inmd:gap-0 dark:bg-dark bg-light">
            <Header />
            <main className="flex-1">
                {props.children}
            </main>
        </div>
    )
}

export default layout;