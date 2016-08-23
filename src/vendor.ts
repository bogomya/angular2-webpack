// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also always add custom-typings.d.ts for custom vendors

// Angular 2
import "zone.js/dist/zone";
import "reflect-metadata/Reflect.js";
import "@angular/platform-browser-dynamic";
import "@angular/http";
import "@angular/router";

// RxJS
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";