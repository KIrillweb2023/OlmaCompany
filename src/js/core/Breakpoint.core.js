export default class Breakpoint {
    constructor(SlimeInit) {
        this.SlimeInit = SlimeInit
    }


    BreakpointMethod = () => {
        if(!this.SlimeInit.breakpoints) return;

        const _WidthWindow = window.innerWidth;
        let breakpointConfirm = false;

       
        this.SlimeInit.breakpoints.sort((a, b) => b.breakpoint - a.breakpoint);

        for (let i = 0; i < this.SlimeInit.breakpoints.length; i++) {
            const item = this.SlimeInit.breakpoints[i];

            if (_WidthWindow <= item.breakpointSize) {
                this.SlimeInit.previewSlides = item.previewSlides;
                this.SlimeInit.previewScrollSlide = item.previewScrollSlide;

                breakpointConfirm = true;
            } 
        }


        if (!breakpointConfirm) {
            this.SlimeInit.previewSlides = this.SlimeInit._ConfirmPreviewSlide;
            this.SlimeInit.previewScrollSlide = this.SlimeInit._ConfirmScrollSlide;
        }

    }
}