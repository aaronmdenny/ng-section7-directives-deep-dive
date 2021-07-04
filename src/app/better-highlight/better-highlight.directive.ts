import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
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
     */
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

}
