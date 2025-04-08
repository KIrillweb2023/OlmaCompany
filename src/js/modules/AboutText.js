export default function AboutText() {
    document.querySelector('.about__details').addEventListener('click', function() {
        const hiddenContent = document.querySelector('.about-text__hidden');
        const detailsBtn = this;
        
        hiddenContent.classList.toggle('show');
        
        if (hiddenContent.classList.contains('show')) {
          detailsBtn.textContent = 'Скрыть';
        } else {
          detailsBtn.textContent = 'Подробнее';
        }
      });
};