import { DurationFormat } from '@formatjs/intl-durationformat';

export const formatDuration = (totalSeconds: number = 0) => {
    const hours = Math.floor(totalSeconds / 60**2);
    const minutes = Math.floor(totalSeconds % 60**2 / 60);
    const seconds = Math.floor(totalSeconds % 60**2 % 60);

    const formatter = new DurationFormat('en-US', {
        style: 'digital',
        hoursDisplay: 'auto'
    });
    return formatter.format({
        hours, minutes, seconds
    })
};