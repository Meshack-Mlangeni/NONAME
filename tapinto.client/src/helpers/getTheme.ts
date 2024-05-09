export default function GetSelectedTheme() {
    return  document.documentElement.getAttribute('data-theme') ?? 'light'
}