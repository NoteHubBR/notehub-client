export function toRelativeTime(dateString: string): string {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    const notificationDate = new Date(2000 + year, month - 1, day, hour, minute);
    const diffInMs = notificationDate.getTime() - Date.now();

    const units: { value: number; unit: Intl.RelativeTimeFormatUnit }[] = [
        { value: Math.round(diffInMs / (1000 * 60 * 60 * 24)), unit: 'day' },
        { value: Math.round(diffInMs / (1000 * 60 * 60)), unit: 'hour' },
        { value: Math.round(diffInMs / (1000 * 60)), unit: 'minute' },
        { value: Math.round(diffInMs / 1000), unit: 'second' }
    ];

    const { value, unit } = units.find(({ value }) => Math.abs(value) > 0) || { value: 0, unit: 'second' };

    return new Intl.RelativeTimeFormat('pt-BR', { style: 'narrow', numeric: 'auto' }).format(value, unit);
};