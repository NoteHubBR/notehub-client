import Header from "./elements/Header";
import Field from "./elements/Field";
import Label from "./elements/Label";
import Input from "./elements/Input";
import Strength from "./elements/Strength";
import Error from "./elements/Error";
import Button from "./elements/Button";
import Link from "./elements/Link";
import Separator from "./elements/Separator";
import OAuthButton from "./elements/OAuthButton";

interface TagProps extends React.HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

export const Tag = ({ children, ...rest }: TagProps) => {
    return (
        <form className="
                w-[444px] insm:w-full
                p-4
                flex flex-col gap-4
                rounded-md
                backdrop-blur-sm
                dark:bg-violet-600/20 bg-indigo-600/10
            " {...rest}>
            {children}
        </form>
    );
};

export const Form = { Tag, Header, Field, Label, Input, Strength, Error, Button, Link, Separator, OAuthButton };