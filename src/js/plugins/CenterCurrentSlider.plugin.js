export default class CenterCurrentSlider {
    constructor(SlimeInit) {
        this.SlimeInit = SlimeInit;
        this.currentCenterSlide = 0;
    }
    getCenterSlideIndex() {
        const visibleSlides = this.SlimeInit.previewSlides;
        const scrollSlides = this.SlimeInit.previewScrollSlide;
        const totalSlides = this.SlimeInit.NumberSlide;
        
        // Для 3 видимых слайдов центральный будет вторым (индекс 1)
        if (visibleSlides === 3) {
            // Вычисляем индекс первого видимого слайда
            const firstVisibleIndex = this.SlimeInit._IndexSlide;
            // Центральный слайд - следующий после первого
            this.currentCenterSlide = firstVisibleIndex + 1;
            
            // Проверяем граничные условия
            if (this.currentCenterSlide >= totalSlides - 1) {
                this.currentCenterSlide = totalSlides - 2;
            }
            
            return Math.max(0, this.currentCenterSlide);
        }
        // Для других случаев (1 или 2 слайда) возвращаем текущий индекс
        else {
            return this.SlimeInit._IndexSlide;
        }
    }
}