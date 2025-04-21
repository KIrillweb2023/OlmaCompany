
export default class LogicsScroll {
    constructor(SlimeInit) {
        this.SlimeInit = SlimeInit
        this.touchStartX = 0; 
        this.touchEndX = 0;   
        this.isDragging = false;
        this.bindSwipeEvents();
    }

    bindSwipeEvents() {
        const sliderCore = this.SlimeInit._Slider; 
        if (!sliderCore) {
            return;
        }

     
        sliderCore.addEventListener('touchstart', this.touchStart.bind(this));
        sliderCore.addEventListener('touchmove', this.touchMove.bind(this));
        sliderCore.addEventListener('touchend', this.touchEnd.bind(this));
        sliderCore.addEventListener('touchcancel', this.touchEnd.bind(this));

    
        sliderCore.addEventListener('mousedown', this.touchStart.bind(this));
        sliderCore.addEventListener('mousemove', this.touchMove.bind(this));   
        sliderCore.addEventListener('mouseup', this.touchEnd.bind(this));   
        sliderCore.addEventListener('mouseleave', this.touchEnd.bind(this)); 
    }

    touchStart(event) {
        this.isDragging = true; 
        this.touchStartX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX; 
    }

    touchMove(event) {
        if (!this.isDragging) return;

        this.touchEndX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;

    }

    touchEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;

        const swipeThreshold = 50; 
        const swipeDistance = this.touchEndX - this.touchStartX; 

        if (swipeDistance > swipeThreshold) {
            this.PrevScrolling();
        } else if (swipeDistance < -swipeThreshold) {
            this.NextScrolling();
        } else {
         
            this.SlimeInit._StyleSliderCore.ScrollingSlide(); 
        }
    }
    NextScrolling = () => {
        const maxIndexSlide = this.SlimeInit.NumberSlide - this.SlimeInit.previewSlides;
        this.SlimeInit._IndexSlide = (this.SlimeInit._IndexSlide < maxIndexSlide) ?
        Math.min(this.SlimeInit._IndexSlide + this.SlimeInit.previewScrollSlide, maxIndexSlide) :
        0;

        this.SlimeInit._TransformSlide = this.SlimeInit._IndexSlide * this.SlimeInit._SlideWidth;

        this.SlimeInit._StyleSliderCore.ScrollingSlide(); 
        this.SlimeInit._PluginPaginaton.UpdatePaginationSlider();
    }
    PrevScrolling = () => {
        const maxIndexSlide = this.SlimeInit.NumberSlide - this.SlimeInit.previewSlides;
        this.SlimeInit._IndexSlide = (this.SlimeInit._IndexSlide > 0) ?
        Math.max(this.SlimeInit._IndexSlide - this.SlimeInit.previewScrollSlide, 0) :
        (this.SlimeInit.NumberSlide > this.SlimeInit.previewSlides ? maxIndexSlide : 0);

        this.SlimeInit._TransformSlide = this.SlimeInit._IndexSlide * this.SlimeInit._SlideWidth;

        this.SlimeInit._StyleSliderCore.ScrollingSlide(); 
        this.SlimeInit._PluginPaginaton.UpdatePaginationSlider();
    }
}