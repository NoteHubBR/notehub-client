function dateDiff(current: Date, past: Date): {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
} {
    let years = current.getFullYear() - past.getFullYear();
    let months = current.getMonth() - past.getMonth();
    let days = current.getDate() - past.getDate();
    let hours = current.getHours() - past.getHours();
    let minutes = current.getMinutes() - past.getMinutes();
    let seconds = current.getSeconds() - past.getSeconds();

    if (seconds < 0) {
        minutes--;
        seconds += 60;
    }
    if (minutes < 0) {
        hours--;
        minutes += 60;
    }
    if (hours < 0) {
        days--;
        hours += 24;
    }
    if (days < 0) {
        months--;
        const prevMonthLastDay = new Date(current.getFullYear(), current.getMonth(), 0).getDate();
        days += prevMonthLastDay;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days, hours, minutes, seconds };
}

export function toRelativeTime(dateString: string): string {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    const notificationDate = new Date(2000 + year, month - 1, day, hour, minute);
    const currentDate = new Date();

    if (notificationDate > currentDate) {
        return new Intl.RelativeTimeFormat('pt-BR', { style: 'long', numeric: 'auto' }).format(0, 'second');
    }

    const diff = dateDiff(currentDate, notificationDate);

    let value: number;
    let unit: Intl.RelativeTimeFormatUnit;

    if (diff.years > 0) {
        value = diff.years;
        unit = 'year';
    } else if (diff.months > 0) {
        value = diff.months;
        unit = 'month';
    } else if (diff.days >= 7) {
        value = Math.floor(diff.days / 7);
        unit = 'week';
    } else if (diff.days > 0) {
        value = diff.days;
        unit = 'day';
    } else if (diff.hours > 0) {
        value = diff.hours;
        unit = 'hour';
    } else if (diff.minutes > 0) {
        value = diff.minutes;
        unit = 'minute';
    } else {
        value = diff.seconds;
        unit = 'second';
    }

    return new Intl.RelativeTimeFormat('pt-BR', { style: 'long', numeric: 'auto' }).format(-value, unit);
}

export function toSpecificTime(dateStr: string): string {
    const [day, month, year] = dateStr.split("/");
    const dayNumber = parseInt(day, 10);
    const monthNumber = parseInt(month, 10);
    const fullYear = year.length === 2 ? parseInt("20" + year, 10) : parseInt(year, 10);
    const monthAbbrs = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
    const monthAbbr = monthAbbrs[monthNumber - 1] || "";
    return `${dayNumber} de ${monthAbbr} de ${fullYear}`;
}