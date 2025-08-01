import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

enum StrengthLevel {
    Empty = 0,
    TooShort,
    Weak,
    Medium,
    Strong,
    VeryStrong,
}

interface StrengthResult {
    level: StrengthLevel;
    score: number;
}

function evaluatePassword(password: string): StrengthResult {

    if (!password) return { level: StrengthLevel.Empty, score: 0 };

    const length = password.length;
    const tests = [
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ]
    const score = tests.filter(Boolean).length;

    if (length < 4 || length > 255) return { level: StrengthLevel.TooShort, score };
    if (length < 6 && score <= 1) return { level: StrengthLevel.Weak, score };
    if (length >= 6 && score === 2) return { level: StrengthLevel.Medium, score };
    if (length >= 8 && score === 4) return { level: StrengthLevel.VeryStrong, score };
    if (length >= 8 && (score === 3 || (score === 2 && (tests[2] || tests[3])))) return { level: StrengthLevel.Strong, score };
    return { level: StrengthLevel.Medium, score };

}

const strengthClasses: Record<StrengthLevel, string> = {
    [StrengthLevel.Empty]: 'w-0 border-transparent',
    [StrengthLevel.TooShort]: 'w-1/5 border-red-600 dark:border-red-500',
    [StrengthLevel.Weak]: 'w-2/5 border-amber-600 dark:border-amber-500',
    [StrengthLevel.Medium]: 'w-1/2 border-amber-400 dark:border-amber-400',
    [StrengthLevel.Strong]: 'w-4/5 border-emerald-600 dark:border-emerald-500',
    [StrengthLevel.VeryStrong]: 'w-full border-emerald-300 dark:border-emerald-300',
}

interface StrengthProps extends React.HTMLAttributes<HTMLDivElement> {
    field: string;
}

const Strength = ({ field, className, ...rest }: StrengthProps) => {

    const password = useWatch({ name: field }) || '';

    const level = useMemo<StrengthLevel>(() => {
        return evaluatePassword(password).level;
    }, [password])

    const strengthClass = strengthClasses[level];

    return (
        <div
            {...rest}
            className={clsx(
                'h-0 border-2 rounded-md transition-all duration-300',
                strengthClass,
                className,
            )}
        />
    )

}

export default Strength;