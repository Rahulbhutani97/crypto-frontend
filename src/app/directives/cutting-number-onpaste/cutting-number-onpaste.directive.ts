import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCuttingNumberOnpaste]'
})
export class CuttingNumberOnpasteDirective {
  inputElement: HTMLElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    let pastedInput: string = event.clipboardData
      .getData('text/plain')
      .toLocaleUpperCase();
    let pastedSplit = pastedInput.split('OK');
    const pastedInt  = pastedSplit[0].replace(/\D/g, ''); // get a digit-only string
    //this.enterAmount = parseInt(pastedSplit[1]);
    //console.log(pastedInt);
    document.execCommand('insertText', false, pastedInt);
  }

}
