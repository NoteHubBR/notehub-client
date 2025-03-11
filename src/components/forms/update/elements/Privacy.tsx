import { Dropdown } from "./Dropdown";
import { IconLock, IconWorld } from "@tabler/icons-react";
import { Option } from "./Option";
import { Select } from "./Select";
import { useState } from "react";
import { useUser } from "@/data/hooks";

export const Privacy = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const { user } = useUser();

    const [state, setState] = useState({
        isMenuOpen: false,
        isProfilePrivate: user?.profile_private ?? false
    });

    const { isMenuOpen, isProfilePrivate } = state;

    const toggleMenu = () => {
        return setState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
    }

    const handleOptionClick = (e: React.MouseEvent, profilePrivate: boolean) => {
        e.stopPropagation();
        return setState(({
            isMenuOpen: false,
            isProfilePrivate: profilePrivate
        }))
    };

    return (
        <div className="px-4 -mt-4 flex justify-end" {...props}>
            <Select
                role="button"
                aria-label="Selecionar"
                tabIndex={0}
                icon={isProfilePrivate ? <IconLock size={27} /> : <IconWorld size={27} />}
                title={isProfilePrivate ? "Privado" : "Público"}
                description={isProfilePrivate ? "Mútuos podem ver" : "Todos podem ver"}
                isMenuOpen={isMenuOpen}
                onClick={toggleMenu}
                onBlur={() => setState((prev) => ({ ...prev, isMenuOpen: false }))}
            >
                <Dropdown isOpen={isMenuOpen}>
                    {isProfilePrivate
                        ?
                        <Option
                            aria-label="Publicar"
                            name="profilePrivate"
                            val={isProfilePrivate}
                            icon={<IconWorld size={27} />}
                            title="Público"
                            description="Todos podem ver"
                            onClick={(e: React.MouseEvent) => handleOptionClick(e, false)}
                        />
                        :
                        <Option
                            aria-label="Privar"
                            name="profilePrivate"
                            val={isProfilePrivate}
                            icon={<IconLock size={27} />}
                            title="Privado"
                            description="Mútuos podem ver"
                            onClick={(e: React.MouseEvent) => handleOptionClick(e, true)}
                        />
                    }
                </Dropdown>
            </Select>
        </div>
    )

}