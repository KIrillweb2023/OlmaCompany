export default function TabsFunction () {
    const tabsContainer = document.querySelector(".adventages__container-pagination");
    const tabContainerItem = document.querySelectorAll(".adventages__container-pagination-item");
    const containerItemTabs = document.querySelectorAll(".adventages__list");
    const blockItem = document.querySelector(".adventages__container");


    function removeClassActiveTab() {
        tabContainerItem.forEach(item => {
            item.classList.remove('adventages__container-pagination-item-active');
        })

        containerItemTabs.forEach(item => {
            item.classList.remove('adventages__list-active');
        })
    }


    function addClassTabActive(i) {
        tabsContainer.children[i].classList.add("adventages__container-pagination-item-active");
        blockItem.children[i].classList.add("adventages__list-active");

        blockItem.children[i].children[0].style.animation = "tab-animation 1s"
        blockItem.children[i].children[1].style.animation = "tab-animation 1.5s"
        blockItem.children[i].children[2].style.animation = "tab-animation 2s"
    }


    function eventTabs() {
        tabContainerItem.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                removeClassActiveTab();
                addClassTabActive(index)
            })
        })
    }

    removeClassActiveTab()
    addClassTabActive(0)
    eventTabs()
}