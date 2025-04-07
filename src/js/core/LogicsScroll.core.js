
export default class LogicsScroll {
    constructor(SlimeInit) {
        this.SlimeInit = SlimeInit
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