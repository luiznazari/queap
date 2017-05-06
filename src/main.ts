import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (queap.properties.prod) {
	enableProdMode();
}

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
