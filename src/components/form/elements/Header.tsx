import Link from "next/link";
import Image from "next/image";

const Header = () => {
    return (
        <header>
            <Link href="/" target="blank" className="
                block
                navigate-logo
                w-fit p-2 m-auto 
                bg-violet-600/5 border-2 dark:border-violet-600/10 border-violet-600/40 rounded-xl
            ">
                <Image src="/logo.png" alt="Logo" priority width={125} height={125} className="w-auto h-auto" />
            </Link>
        </header>
    );
};

export default Header;