import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdawn]'
})
export class DropdawnDirective {
  toggle = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') dropdawnToggle(){
    this.toggle = ! this.toggle;
    this.renderer.addClass(this.el.nativeElement, this.toggle ? 'open': 'none');
    this.renderer.removeClass(this.el.nativeElement, this.toggle ? 'none': 'open')
    }

}
