export default class Pagination {
    constructor(SlimeInit) {
        this.SlimeInit = SlimeInit
    }
    PaginationSlider = () => {
        if(this.SlimeInit.pagination === true) {
            const paginationContainer = document.querySelector(`${this.SlimeInit.sliderClass}-pagination`);
            let paginationNumbers = 0;

  
            if (this.SlimeInit.NumberSlide > this.SlimeInit.previewSlides) {
                paginationNumbers = Math.ceil((this.SlimeInit.NumberSlide - this.SlimeInit.previewSlides) / this.SlimeInit.previewScrollSlide) + 1;
            }
        
            else {
                paginationNumbers = 1;
            }

            paginationContainer.innerHTML = "";

            for (let i = 0; i < paginationNumbers; i++) {
                const paginationItem = document.createElement("li");
                paginationItem.classList.add(`price-pagination-item`);
                paginationItem.addEventListener("click", () => this.getIndexSlider(i));
                paginationContainer.appendChild(paginationItem);
            }

            this.UpdatePaginationSlider();
        }
    }

    UpdatePaginationSlider = () => {
        const paginationContainer = document.querySelector(`${this.SlimeInit.sliderClass}-pagination`);
        const indicators = paginationContainer.querySelectorAll(`${this.SlimeInit.sliderClass}-pagination-item`);
        indicators.forEach(indicator => indicator.classList.remove("active"));
    
        const maxIndexSlide = this.SlimeInit.NumberSlide - this.SlimeInit.previewSlides;
        let activeIndex = Math.ceil(this.SlimeInit._IndexSlide / this.SlimeInit.previewScrollSlide);

    
        if (maxIndexSlide < 0) {
            activeIndex = 0;
        } else if (this.SlimeInit._IndexSlide >= maxIndexSlide) {
            activeIndex = indicators.length > 0 ? indicators.length - 1 : 0;
        }
      
        activeIndex = Math.min(activeIndex, indicators.length - 1);
        activeIndex = Math.max(activeIndex, 0);

       
        if (activeIndex >= 0 && activeIndex < indicators.length) {
            indicators[activeIndex].classList.add("active");
        }
    
       
    }

    getIndexSlider = (index) => {
        const maxIndexSlide = this.SlimeInit.NumberSlide - this.SlimeInit.previewSlides;
        let newIndexSlide = index * this.SlimeInit.previewScrollSlide;
    
        newIndexSlide = Math.min(newIndexSlide, maxIndexSlide);
    
        this.SlimeInit._IndexSlide = newIndexSlide;
        this.SlimeInit._TransformSlide = this.SlimeInit._IndexSlide * this.SlimeInit._SlideWidth;
      
        this.SlimeInit._StyleSliderCore.ScrollingSlide();
        this.UpdatePaginationSlider();
    }
}