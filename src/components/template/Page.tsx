export interface PageProps {
    children: any;
    className?: string;
};

const Page = (props: PageProps) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default Page;