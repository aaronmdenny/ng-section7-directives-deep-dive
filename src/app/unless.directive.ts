import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  /**
   * We implemment a structural directive, 'unless', which should be the opposite of ngIf.
   * 
   * We get the condition as an input. We want to bind to a property named 'unless', which is the condition we get from
   * outside. But, whenever this condition changes (whenever some input parameter here changes), we want to execute a
   * method. Therefore, we can implement a setter with the 'set' keyword.
   * 
   * This turns the property into a method. The method gets executed whenever the property changes. So, in this case,
   * whenever the parameter changes.
   * 
   * In the end, our 'unless' directive will sit on an ng-template, because that is what Angular transforms it into when
   * we use the *.
   * 
   * So, we can get access to the ng-template, and we also need access to the place in the document where we want to
   * render. Both can be injected. The template can be injected by adding templateRef. Recall, elementRef gave us access
   * to the element a directive is on. TemplateRef gives us access to the ng-template the directive sits on. To access
   * the view container (which gives us access to the place in the document where we want to render), we also inject in
   * the constructor. vcRef marks the place where we place this directive in the document.
   * 
   * 
   */
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // Creates a view in the view container. The view is our template ref.
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // Remove everything from this place in the DOM.
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}
