export default function convertToDateTimeAgo(datetime: string): string {
    const timestamp = new Date(datetime).getTime();
    const now = Date.now();
    const diff = now - timestamp;
    if (diff < 5 * 60 * 1000) {
        return "just now";
    } else if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diff < 30 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (diff < 365 * 24 * 60 * 60 * 1000) {
        const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
        return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
        const years = Math.floor(diff / (365 * 24 * 60 * 60 * 1000));
        return `${years} year${years > 1 ? "s" : ""} ago`;
    }
}