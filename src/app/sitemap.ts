import { MetadataRoute } from 'next';
import { Note, Page, User } from '@/core';

function parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/')
    return new Date(`20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const usersPage: Page<User> = await fetch('https://api.notehub.com.br/api/v1/users?sort=followersCount,desc').then(res => res.json());
    const notesPage: Page<Note> = await fetch('https://api.notehub.com.br/api/v1/notes/search?sort=flamesCount,desc').then(res => res.json());

    const userRoutes = usersPage.content.map(u => ({
        url: `https://notehub.com.br/${u.username}`,
        lastModified: parseDate(u.created_at),
        priority: 0.8,
    }))

    const noteRoutes = notesPage.content.map(n => ({
        url: `https://notehub.com.br/${n.user ? n.user.username : 'user'}/notes/${n.id}`,
        lastModified: parseDate(n.modified_at),
        priority: 0.9,
    }))

    return [
        { url: 'https://notehub.com.br', priority: 1.0 },
        { url: 'https://notehub.com.br/signup', priority: 0.6 },
        { url: 'https://notehub.com.br/signin', priority: 0.5 },
        { url: 'https://notehub.com.br/help', priority: 0.7 },
        { url: 'https://notehub.com.br/changelog', priority: 0.7 },
        { url: 'https://notehub.com.br/sponsorship', priority: 0.6 },
        ...userRoutes,
        ...noteRoutes,
    ]

}