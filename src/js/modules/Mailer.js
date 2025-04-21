export default function Mailer() {
    const inputName = document.getElementById("userName");
    const inputEmail = document.getElementById("userEmail");
    const inputNumber = document.getElementById("userPhone");
    const formSubmit = document.querySelector(".submit__container-form")

    const inputNameModal = document.getElementById("userName-modal");
    const inputEmailModal = document.getElementById("userEmail-modal");
    const inputNumberModal = document.getElementById("userPhone-modal");
    const formSubmitModal = document.querySelector(".modal__container-form")

    const modalSubmit = document.querySelector(".modal")

    const modalSuccess = document.querySelector(".success");


    function mailerPush(form, nameID, numberID, emailID, modalOpen, modal = modalSubmit) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        
         
            const name = nameID.value;
            const email = emailID.value;
            const number = numberID.value;
        
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('number', number);
            console.log(formData);
        
            fetch('mailer/smart.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    modal.classList.remove("active")
                    modalOpen.classList.add("active")
                    return response.text()
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                form.reset();
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            });
        });
    }

    mailerPush(formSubmit, inputName, inputNumber, inputEmail, modalSuccess)
    mailerPush(formSubmitModal, inputNameModal, inputNumberModal, inputEmailModal, modalSuccess)


}