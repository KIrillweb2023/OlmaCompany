export default class InitSliderStylesContainer  { // настраивание ширины слайдов и их контейнера
    constructor(SlimeInit) {
        this.SlimeInit = SlimeInit
    }

    InitSliderStyle = () => {
        this.SlimeInit._SlideWidth = this.SlimeInit._Slider.clientWidth / this.SlimeInit.previewSlides;

        this.SlimeInit._Slide.forEach(item => {
            item.style.width = `${this.SlimeInit._SlideWidth}px`;
        })
    
        this.SlimeInit._ContainerSlide.style.width = `${ this.SlimeInit.NumberSlide * this.SlimeInit._SlideWidth }px`;
        this.SlimeInit._ContainerSlide.style.display = "flex"; 
        this.SlimeInit._ContainerSlide.style.transition = `transform ${ this.SlimeInit.speedSlider }s ease-in-out`;
        
    
        this.ScrollingSlide()      
        this.SlimeInit._BreakpointCore.BreakpointMethod()
    }

    ScrollingSlide = () => { // Прокрутка слайдера
        this.SlimeInit._ContainerSlide.style.transform = `translateX(-${this.SlimeInit._TransformSlide}px)`;
    }
}