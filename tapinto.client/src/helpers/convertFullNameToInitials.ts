export default function convertFullNamesToInitials(fullName: string) {
    const fNameArray = fullName.toUpperCase().split(" ");
    if (fNameArray && fNameArray.length > 1) {
        return fNameArray[0][0] + fNameArray[1][0];
    }
    return fullName[0];
}