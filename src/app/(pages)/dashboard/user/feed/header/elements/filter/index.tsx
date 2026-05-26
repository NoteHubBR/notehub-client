import { clsx } from 'clsx';
import { Dropdown, Footer, Header, HeaderCloseBtn, HeaderTitle, Menu, ResetBtn, SaveBtn } from './elements';
import { IconFilter, IconX } from '@tabler/icons-react';
import { useRef, useState } from 'react';

export const Filter = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownTrigger = useRef<HTMLButtonElement | null>(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);
    const resetEvents = () => { return };
    const saveEvents = () => setIsDropdownOpen(false);

    return (
        (
            <div className='relative'>
                <button
                    ref={dropdownTrigger}
                    id='filters'
                    aria-label="Abrir filtro"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleDropdown}
                    className={clsx(
                        'select-none relative',
                        'px-2 py-1 rounded-xl flex items-center gap-1',
                        'border dark:border-neutral-700/50 border-dark/25',
                        'dark:bg-dark bg-light',
                        'focus-visible:dark:bg-semidark focus-visible:bg-semilight',
                        'hover:dark:bg-semidark hover:bg-semilight',
                        'transition-colors'
                    )}
                    {...props}
                >
                    <span><IconFilter size={18} /></span>
                    <span className="text-sm">Filtro</span>
                </button>
                <Dropdown
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='filters'
                    aria-hidden={!isDropdownOpen}
                    hidden={!isDropdownOpen}
                    triggerRef={dropdownTrigger}
                    isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                >
                    <Header>
                        <HeaderTitle>Filtro</HeaderTitle>
                        <HeaderCloseBtn icon={IconX} onClose={closeDropdown} />
                    </Header>
                    <Menu />
                    <Footer>
                        <ResetBtn onReset={resetEvents} />
                        <SaveBtn onSave={saveEvents} />
                    </Footer>
                </Dropdown>
            </div>
        )
    )

}