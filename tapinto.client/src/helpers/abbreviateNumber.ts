export default function abbreviateNumber(number: number): string {
    if (number < 1000) {
        return number.toString();
    } else if (number < 1_000_000) {
        return (number / 1000).toFixed(1) + 'k';
    } else {
        return (number / 1_000_000).toFixed(1) + 'm';
    }
}