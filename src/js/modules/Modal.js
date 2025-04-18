export default function Modal() {

    function openModal(openBtn, modal) {
       openBtn.addEventListener("click", () => {
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
       })


    }
    function closeModal(closeBtn, modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
            document.body.style.overflow = "";
       })
    }

    openModal(document.querySelector(".breakins"), document.querySelector(".modal"))
    closeModal(document.querySelector(".modal__container-form-close"), document.querySelector(".modal"))

    openModal(document.querySelector(".consult"), document.querySelector(".consultation"))
    closeModal(document.querySelector(".consultation-close"), document.querySelector(".consultation"))

    
  
}