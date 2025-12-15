export default interface SessionPreferences {
    isSponsorshipInviteAllowed: boolean;
}

export function storeSessionPref() {
    const pref: SessionPreferences = {
        isSponsorshipInviteAllowed: true
    }
    sessionStorage.setItem('preferences', JSON.stringify(pref));
}