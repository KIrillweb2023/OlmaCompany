export default class EventsSlider {
    constructor(SlimeInit) {
        this.SlimeInit = SlimeInit;
    }


    EventSliderMethod = () => {
    
        if(!this.SlimeInit.navigation.nextSlideBtn || !this.SlimeInit.navigation.prevSlideBtn) return;

        const _NextBtnSlide = document.querySelector(this.SlimeInit.navigation.nextSlideBtn);
        const _PrevBtnSlide = document.querySelector(this.SlimeInit.navigation.prevSlideBtn);

        _NextBtnSlide.addEventListener("click", () => this.SlimeInit._LogicsScrollCore.NextScrolling());
        _PrevBtnSlide.addEventListener("click", () => this.SlimeInit._LogicsScrollCore.PrevScrolling());
    
    }
}