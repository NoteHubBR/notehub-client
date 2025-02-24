import { Header } from "./components/Header";

const layout = (props: any) => {
    return (
        <div className="w-full h-full py-4 px-4 inlg:px-2 dark:bg-neutral-900 bg-neutral-100">
            <Header />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default layout;