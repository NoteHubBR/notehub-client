import { Checkbox, Dropdown, events, Footer, Header, HeaderCloseBtn, HeaderTitle, Item, Label, Menu, ResetBtn, SaveBtn } from './elements';
import { clsx } from 'clsx';
import { Event } from '@/core';
import { IconFilter, IconX } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { useStore, useUser } from '@/data/hooks';

export const Filter = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    const { user } = useUser();
    const { filters, setActions } = useStore();

    const [filterEvents, setFilterEvents] = useState<Event[]>(filters(user));
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownTrigger = useRef<HTMLButtonElement | null>(null);

    const disableSave: boolean = filterEvents.length === 0;

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const closeDropdown = () => setIsDropdownOpen(false);

    const resetEvents = () => setFilterEvents(Object.values(Event));

    const saveEvents = () => {
        if (disableSave) return;
        setActions({ filters: filterEvents }, user?.username);
        setIsDropdownOpen(false);
    }

    const toggleEvent = (event: Event) => () => {
        setFilterEvents(prev => prev.includes(event)
            ? prev.filter(e => e !== event)
            : [...prev, event]
        )
    }

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
                    <Menu>
                        {Object.values(events).map((item) => (
                            <li key={item.event}>
                                <Label htmlFor={item.event}>
                                    <Checkbox
                                        id={item.event}
                                        event={item.event}
                                        events={filterEvents}
                                        onCheck={toggleEvent}
                                    />
                                    <Item
                                        icon={item.icon}
                                        label={item.label}
                                        tip={item.tip}
                                    />
                                </Label>
                            </li>
                        ))}
                    </Menu>
                    <Footer>
                        <ResetBtn onReset={resetEvents} />
                        <SaveBtn disabled={disableSave} onSave={saveEvents} />
                    </Footer>
                </Dropdown>
            </div>
        )
    )

}