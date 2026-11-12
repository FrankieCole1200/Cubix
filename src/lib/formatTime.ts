// Converts time in milliseconds into a readable string

export function formatTime(milliseconds: number): string
{
    const centiseconds = Math.floor(milliseconds/10);

    const minutes = Math.floor(centiseconds/6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const hundredths = centiseconds % 100;

    const formattedSeconds = minutes > 0 ? String(seconds).padStart(2, "0"): String(seconds);

    const formattedHundredths = String(hundredths).padStart(2, "0");

    if (minutes > 0) {
        return `${minutes}:${formattedSeconds}.${formattedHundredths}`;
    }

    return `${formattedSeconds}.${formattedHundredths}`;
}