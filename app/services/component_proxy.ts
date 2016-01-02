/// <reference path="../../tools/typings/tsd/systemjs/systemjs.d.ts"/>

import {
  Component,
  DynamicComponentLoader,
  ElementRef,
  Injector,
  provide,
  Type,
  View
} from 'angular2/core';
/**
 * A factory for a <a href="https://en.wikipedia.org/wiki/Proxy_pattern#Possible_Usage_Scenarios">Virtual Proxy</a> Component
 * to provide a lazily loaded `Component` which will be loaded and rendered by the `DynamicComponentLoader` on entering a route when
 * the constructor of the Virtual Component is executed.
 *
 * @Example:
 * {
 *   path: '/path-in-the-browser',
 *   component: componentProxyFactory({
 *     path: './path/to/the/file',
 *     provide: m => m.ClassNameOfComponent
 *   }),
 *   as: 'ComponentName'
 * }
 *
 */

class ComponentProvider {
  path: string;
  provide: {(module: any): any};
}

export function componentProxyFactory(provider: ComponentProvider): Type {
  @Component({
    selector: 'component-proxy',
    providers: [provide(ComponentProvider, {useValue: provider})]
  })
  @View({
    template: `<span #content></span>`
  })
  class VirtualComponent {
    constructor(
      el: ElementRef,
      loader: DynamicComponentLoader,
      inj: Injector,
      provider: ComponentProvider
    ) {
        System.import(provider.path)
        .then(m => {
          loader.loadIntoLocation(provider.provide(m), el, 'content');
        });
      }
  }
  return VirtualComponent;
}
