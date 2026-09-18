import { ApiClient } from './api';
import { seedNotes, seedUsers } from './seeds';

export default async function globalSetup() {

    const api = await ApiClient.create();

    const alreadySeeded = await api.canLogin(seedUsers.usera.username, seedUsers.usera.password);
    if (alreadySeeded) {
        if (await api.canLogin('userx', 'userx')) {
            await api.deleteUser(
                await api.login('userx', 'userx'),
                { password: 'userx' }
            )
        }
        console.log('↷ e2e database already seeded, skipping.');
        await api.dispose();
        return;
    }

    for (const user of Object.values(seedUsers)) {
        await api.createUser(user);
    }

    const tokens: Record<keyof typeof seedUsers, string> = {} as never;
    for (const [key, user] of Object.entries(seedUsers)) {
        tokens[key as keyof typeof seedUsers] = await api.login(user.username, user.password);
    }

    for (const [key, user] of Object.entries(seedUsers)) {
        if (user.privateProfile) await api.changeProfileVisibility(tokens[key as keyof typeof seedUsers]);
    }

    await api.createFollow(tokens.usera, seedUsers.userb.username);
    await api.createFollow(tokens.usera, seedUsers.userd.username);
    await api.createFollow(tokens.userb, seedUsers.usera.username);
    await api.createFollow(tokens.userd, seedUsers.usera.username);

    const noteIds: Record<keyof typeof seedNotes, string> = {} as never;
    for (const [key, note] of Object.entries(seedNotes)) {
        const created = await api.createNote(tokens[note.author], {
            name: note.name,
            tags: note.tags,
            closed: note.closed,
            hidden: note.hidden,
        })
        noteIds[key as keyof typeof seedNotes] = created.id;
    }

    await api.createFlame(tokens.usera, noteIds.notea);
    await api.createFlame(tokens.userb, noteIds.notea);
    await api.createFlame(tokens.usera, noteIds.noteb);

    await api.dispose();
    console.log('✔ e2e database seeded successfully.');

}