/// <reference path="../typings/_custom.d.ts" />

/*
 * Angular 2 decorators and services
 */
import {Directive, Component, View, ElementRef, NgFor} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

/*
 * Angular Directives
 */
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';


/*
 * Directive
 * XLarge is a simple directive to show how one of made
 */
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
class XLarge {
  constructor(element: ElementRef) {
    // simple DOM manipulation to set font size to x-large
    // `nativeElement` is the direct reference to the DOM element
    element.nativeElement.fontSize = 'x-large';
  }
}


/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app' // <app></app>
})
@View({
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, XLarge, NgFor ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [`
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    main {
      padding: 1em;
    }
  `],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <header>
    <h1 class="title">Angular 2 Calculator</h1>
  </header>

  <main>
    <div>
      <input type="text" [value]="displayValue" disabled="disabled" autofocus>
      <input type="text" [value]="action" disabled="disabled" size="1">
    </div>
    <div>
      <button *ng-for="#button of buttons" (click)="button.val();">{{button.key}}</button>
    </div>
  </main>

  <footer>
    WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
  </footer>
  `
})
export class App {
  // These are member type
  result: number;
  displayValue: number;
  action: string;
  actionWasJustClicked: boolean;
  buttons: Array<any> = [
    {key: "0", val: this.numberClick(0)},
    {key: "1", val: this.numberClick(1)},
    {key: "2", val: this.numberClick(2)},
    {key: "3", val: this.numberClick(3)},
    {key: "4", val: this.numberClick(4)},
    {key: "5", val: this.numberClick(5)},
    {key: "6", val: this.numberClick(6)},
    {key: "7", val: this.numberClick(7)},
    {key: "8", val: this.numberClick(8)},
    {key: "9", val: this.numberClick(9)},
    {key: "C", val: this.clearClick()},
    {key: "+", val: this.actionClick("+")},
    {key: "-", val: this.actionClick("-")},
    {key: "*", val: this.actionClick("*")},
    {key: "/", val: this.actionClick("/")},
    {key: "=", val: this.actionClick("=")},
  ]; // default data

  constructor(/*public http: Http*/) {
    this.result = 0;
    this.displayValue = 0;
    this.action = null;
    this.actionWasJustClicked = false;
  }

  numberClick(num: number) : Function {
    var me = this;
    return function () {
      if (me.actionWasJustClicked) {
        me.displayValue = 0;
        me.actionWasJustClicked = false;
      }

      me.displayValue = me.displayValue * 10 + num;
    }
  }

  clearClick() : Function {
    var me = this;
    return function () {
      me.result = 0;
      me.displayValue = 0;
      me.action = null;
    }
  }

  actionClick(act: string) : Function {
    var me = this;
    return function () {
      switch (me.action) {
        case "+":
          me.result += me.displayValue;
          break;
        case "-":
          me.result -= me.displayValue;
          break;
        case "*":
          me.result *= me.displayValue;
          break;
        case "/":
          me.result /= me.displayValue;
          break;
        default:
          me.result = me.displayValue;
      }

      me.displayValue = me.result;
      me.action = act;
      me.actionWasJustClicked = true;
    }
  }
}



/*
 * Please review the examples/ folder for more angular app examples
 * For help or questions please contact us at @AngularClass on twitter
 * or via chat on gitter at https://gitter.im/angular-class/angular2-webpack-starter
 */

