import InitSliderStylesContainer from "./core/StyleSlider.core";
import LogicsScroll from "./core/LogicsScroll.core";
import EventsSlider from "./core/EventsSlider.core";
import WindowResize from "./core/WindowResize.core";
import Pagination from "./plugins/Pagination.plugin";
import Breakpoint from "./core/Breakpoint.core";

import AboutText from "./modules/AboutText";
import TabsFunction from "./modules/Tabs";
import MaskaText from "./modules/MaskaText";


class SlimeInit {
    constructor
        ({ 
            sliderClass = "",
            navigation = { nextSlideBtn: "", prevSlideBtn: "" },
            previewSlides = 1,
            speedSlider = 0.5,
            previewScrollSlide = 1,
            breakpoints = [],
            pagination = false,

        }) {

        this.sliderClass = sliderClass;


        this._ContainerSlide = document.querySelector(`${this.sliderClass}-slides`);  // контейнер слайдов
        this._Slide = document.querySelectorAll(`${this.sliderClass}-slide`); // сами слайды
        this._Slider = document.querySelector(`${this.sliderClass}-container`); // слайдер в общем

        this.previewSlides = previewSlides;
        this.navigation = navigation;
        this.speedSlider = speedSlider;
        this.previewScrollSlide = previewScrollSlide;
        this.breakpoints = breakpoints;
        this.pagination = pagination;
        
        this._ConfirmScrollSlide = this.previewScrollSlide;
        this._ConfirmPreviewSlide = this.previewSlides;


        this._TransformSlide = 0;   // расчетная переменная для перелистывания слайдера
        this._IndexSlide = 0;   // индекс слайдера
        this.NumberSlide = this._ContainerSlide.children.length;  // количество слайдов

        this._StyleSliderCore = new InitSliderStylesContainer(this)
        this._LogicsScrollCore = new LogicsScroll(this)
        this._EventSliderCore = new EventsSlider(this)
        this._WindowResizeCore = new WindowResize(this)
        this._PluginPaginaton = new Pagination(this)
        this._BreakpointCore = new Breakpoint(this)
    }


    InitSlider = () => {
        this._BreakpointCore.BreakpointMethod();
        this._StyleSliderCore.InitSliderStyle();
        this._WindowResizeCore.WindowResizeMethod()
        this._EventSliderCore.EventSliderMethod()

        this._PluginPaginaton.PaginationSlider();
        this._PluginPaginaton.UpdatePaginationSlider();
    
        
    }
}

document.addEventListener("DOMContentLoaded", (e) => {

    const PriceSectionSlider = new SlimeInit({
        sliderClass: ".price",
        navigation: {
            nextSlideBtn: ".price-navigation-next",
            prevSlideBtn: ".price-navigation-prev"
        },
        previewSlides: 3,
        speedSlider: 0.6,
        previewScrollSlide: 3,
        pagination: true,
        breakpoints: [
            {
                breakpointSize: 1200,
                previewScrollSlide: 1,
                previewSlides: 1
            },
            {
                breakpointSize: 768,
                previewScrollSlide: 1,
                previewSlides: 2
            },
            {
                breakpointSize: 567,
                previewScrollSlide: 1,
                previewSlides: 1
            }
        ]
    });
    const ReviewSectionSlider = new SlimeInit({
        sliderClass: ".reviews",
        navigation: {
            nextSlideBtn: ".reviews-navigation-next",
            prevSlideBtn: ".reviews-navigation-prev"
        },
        previewSlides: 3,
        speedSlider: 0.6,
        previewScrollSlide: 1,
        pagination: true,
        breakpoints: [
            {
                breakpointSize: 1200,
                previewScrollSlide: 1,
                previewSlides: 1
            },
            {
                breakpointSize: 768,
                previewScrollSlide: 1,
                previewSlides: 2
            },
            {
                breakpointSize: 567,
                previewScrollSlide: 1,
                previewSlides: 1
            }
        ]
    });

    PriceSectionSlider.InitSlider(); 
    ReviewSectionSlider.InitSlider(); 

    AboutText()
    TabsFunction()
    MaskaText()
})
