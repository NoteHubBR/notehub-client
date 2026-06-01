import { Event } from '@/core';
import { IconFlame, IconMessageCircle, IconNotes, IconUserPlus } from '@tabler/icons-react';

type Item = {
    event: Event;
    icon: React.ElementType
    label: 'Seguindo' | 'Notas' | 'Chamas' | 'Comentários';
    tip: string;
}

export const events: Record<Event, Item> = {
    User_Followed: {
        event: 'User_Followed' as Event,
        icon: IconUserPlus,
        label: 'Seguindo',
        tip: 'Quem as pessoas estão seguindo'
    },
    Note_Created: {
        event: 'Note_Created' as Event,
        icon: IconNotes,
        label: 'Notas',
        tip: 'Criação de novas notas'
    },
    Note_Flamed: {
        event: 'Note_Flamed' as Event,
        icon: IconFlame,
        label: 'Chamas',
        tip: 'Notas flamejadas'
    },
    Note_Commented: {
        event: 'Note_Commented' as Event,
        icon: IconMessageCircle,
        label: 'Comentários',
        tip: 'Comentários realizados'
    },
}