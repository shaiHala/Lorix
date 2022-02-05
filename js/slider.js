

/*********************
 *	Helpers Code
 ********************/
/**
 *  @function   DOMReady
 *
 *  @param callback
 *  @param element
 *  @param listener
 *  @returns {*}
 *  @constructor
 */
 const DOMReady = (
    callback = () => {},
    element = document,
    listener = 'addEventListener') =>
    {
      return element[listener] ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
    };
    
    
    /*********************
     *	Application Code
     ********************/
    /**
     *  @class  SimpleSlider
     */
    class SimpleSlider {
      /**
       *  @constructor
       *
       *  @param element
       *  @param options
       */
      constructor(element, options = {}) {
        this.el = document.querySelector(element);
        this.options = Object.assign({
          'slides': '.slider__slide',
          'controls': '.slider__control',
          'sliding-time-seconds': '1.3',
          'js-slide': '.js-slide',
          'js-control': '.js-control' },
        options);
    
    
        this.init();
      }
      /**
       *  @function init
       *
       *  @public
       */
      init() {
        this.slides = this.el.querySelectorAll(this.options.slides);
        this.controls = this.el.querySelectorAll(this.options.controls);
        this.countOfSlides = this.slides.length;
        this.slidingTime = this.options['sliding-time-seconds'] * 1000;
        this.slidingLock = false;
    
    
        [].slice.call(this.slides).forEach((el, index) => {
          let i = index + 1;
    
          el.classList.add(this.options['js-slide'].substring(1) + '--' + i);
          el.dataset.slide = i;
    
          if (i === 1) {
            el.classList.add(this.options['js-slide'].substring(1) + '--active');
          }
        });
    
        [].slice.call(this.controls).forEach((el, index) => {
          let elData = el.dataset,
          i = index + 1;
    
          i === 1 ? elData.control = 'left' : elData.control = 'right';
    
          el.addEventListener(
          'click',
          this._controlAction.bind(this, el),
          false);
    
        });
      }
      /**
       *  @function _controlAction
       *
       *  @param el
       *  @private
       */
      _controlAction(el) {
        if (this.slidingLock) {
          return;
        }
        this.slidingLock = true;
    
        let currentControl = el,
        currentActive = this.el.querySelector(this.options['js-slide'] + '--active'),
        isLeftControl = currentControl.getAttribute('data-control') === 'left',
        indexOfCurrentSlide = +currentActive.getAttribute('data-slide'),
        newActive,
        jsSlideActive = this.options['js-slide'].substring(1) + '--active',
        jsSlideActivePrev = this.options['js-slide'].substring(1) + '--active-prev',
        jsControlActive = this.options['js-control'].substring(1) + '--active';
    
    
        isLeftControl ? --indexOfCurrentSlide : ++indexOfCurrentSlide;
    
        if (indexOfCurrentSlide < 1) {
          indexOfCurrentSlide = this.countOfSlides;
        }
        if (indexOfCurrentSlide > this.countOfSlides) {
          indexOfCurrentSlide = 1;
        }
    
        newActive = this.el.querySelector(
        this.options['js-slide'] + '--' + indexOfCurrentSlide);
    
    
        isLeftControl ?
        newActive.classList.add(jsSlideActive, jsSlideActivePrev) :
        newActive.classList.add(jsSlideActive);
    
        currentControl.classList.add(
        jsControlActive);
    
        currentActive.classList.remove(
        jsSlideActive,
        jsSlideActivePrev);
    
    
    
        setTimeout(() => {
          currentControl.classList.remove(
          jsControlActive);
    
    
          this.slidingLock = false;
        }, this.slidingTime);
      }}
    
    
    
    /**
     *  @function   readyFunction
     *
     *  @type {Function}
     */
    const readyFunction = () => {
      return new SimpleSlider('.slider');
    };
    
    
    /**
     *  Launcher
     */
    DOMReady(readyFunction);