export default function Hamburger() {
    const OpenBtnMenu = document.querySelector(".header__hamburger");
    const CloseBtnMenu = document.querySelector(".menu-close");
    const ThisMenu = document.querySelector(".menu");


    function OpenMenu(menu) {
        menu.classList.add("menu-active");
    }

    function CloseMenu(menu) {
        menu.classList.remove("menu-active");
    }

    OpenBtnMenu.addEventListener("click", (e) => OpenMenu(ThisMenu))
    CloseBtnMenu.addEventListener("click", (e) => CloseMenu(ThisMenu))
}