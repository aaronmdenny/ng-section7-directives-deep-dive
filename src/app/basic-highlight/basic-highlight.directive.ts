import { Directive, ElementRef, OnInit } from "@angular/core";

/**
 * Directives require a unique selector, so we prefix with app.
 * 
 * To select by element:
 *  selector: 'appBasicHighlight'
 * 
 * To select by attribute:
 *  selector: '[appBasicHighlight]'
 */
@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  /**
   * Angular gives us access to the element inside of which we place our custom directive. We can inject that element
   * inside of this directive by utilizing the constructor.
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * Recall, it is best to not manipulate the DOM by accessing elements like this. See a better solution in the next
   * commit.
   */
  /**
   * Angular is able to render your templates without a DOM, at which time, properties might not be available. So, it is
   * a bad idea to directly access your elements. It is better to inject the renderer. See 'better-highlight'.
   */
  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}