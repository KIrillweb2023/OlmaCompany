export default function ScrollFooterMenu() {
    const MenuItems = document.querySelectorAll(".footer-item")

    MenuItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            item.classList.toggle("active")
        })
    })
}