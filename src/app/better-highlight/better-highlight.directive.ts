import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  /**
   * @HostListener() is fine for what we are doing, but there is another decorator we can use that allows us to not use
   * the renderer. There is nothing wrong with using the renderer here, but there is an even easier way of changing the
   * background color if that is all we want to do in this directive.
   * 
   * @HostBinding() takes a string that is the property of the hosting element we want to bind. This is the same as what
   * we access in the basic-highlight directive:
   * 
   *    this.elementRef.nativeElement.style.backgroundColor = 'green';
   * 
   * Here, backgroundColor is the property.
   * 
   * Camelcase is important because we are accessing the DOM property itself.
   * 
   * What we are telling Angular is, on the directive this element sits, access the style property (which all elements
   * will have. Some will not have, for example, a value property), and then the sub-property backgroundColor. We can
   * change this property in the @HostListener() decorated methods below.
   * 
   * We have to set an initial backgroundColor.
   * 
   * With @HostBinding(), you can bind to any property of the element the directive sits on.
   */
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

/**
 * The renderer instance of Renderer2 is the better tool to use to manipulate DOM elements (as opposed to an instance of
 * ElementRef). It gives us helper methods to use when working with the DOM.
 */
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    /**
     * The renderer gives us helper methods to use when working with the DOM. The setStyle() method allows us to set the
     * style of an element. The problem is, we need to have the element to work with. Angular offers different ways of
     * getting an element, but here in the directive, it is very simple, because we can inject the element reference in
     * the constructor.
     * 
     * We access the underlying element, not the reference to the element itself, and pass it as the first argument. The
     * second argument is the style we want to set (background color). The third argument is the value we want to assign
     * to the property (blue). There is an optional fourth argument (flags). This could be !important, for example.
     * 
     * The renderer is the better way to manipulate the DOM elements because Angular is not limited to running in the
     * browser. It also works with service workers. These are environments where you might not have access to the DOM.
     * So, if you try to manipulate the DOM as we did in 'basic-highlight', by directly accessing the native element,
     * you might get an error in some circumstances. You will probably not encounter this, and if your app is not going
     * to run in the browser, you would certainly be aware of that, but it is better to cover this case.
     * 
     * Learn more about the renderer here: https://angular.io/api/core/Renderer2
     */
    /**
     * We can make this directive more interactive. Perhaps we want to only make the background color blue if the user
     * hovers over the element with the mouse.
     * 
     * We need to react to some events occurring on the element the directive sits on. We can accomplish this with the
     * @HostListener() decorator.
     */
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

  /**
   * We attach @HostListener() to a method we want to execute (mouseOver()). We specify the event we want to use to
   * trigger the mouseOver() method in the argument to HostListener().
   * 
   * The mouseenter event is supported by the element this directive sits on (a p element).
   * 
   * Event data is passed via the parameter. We can also listen to custom events here.
   */
  @HostListener('mouseenter') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = 'transparent';
  }
}
