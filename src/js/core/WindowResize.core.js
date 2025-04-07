export default class WindowResize {
    constructor(SlimeInit) {
        this.SlimeInit = SlimeInit
    }


    WindowResizeMethod = () => {
        window.addEventListener("resize", (e) => {
            this.SlimeInit._BreakpointCore.BreakpointMethod()
            this.SlimeInit._StyleSliderCore.InitSliderStyle();
            this.SlimeInit._PluginPaginaton.PaginationSlider();
            this.SlimeInit._PluginPaginaton.UpdatePaginationSlider();
            this.SlimeInit._TransformSlide = 0;
            this.SlimeInit._IndexSlide = 0;
        })
    }
}