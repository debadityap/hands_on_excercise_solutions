import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class Highlight implements OnInit {

  @Input('appHighlight') highlightColor: string = 'yellow';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

    if (!this.highlightColor) {
      this.highlightColor = 'yellow';
    }
  }


  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.highlightColor);
  }


  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
  }
}
