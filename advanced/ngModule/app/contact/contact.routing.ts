import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'contact', component: ContactComponent}
]);

/**
 * 注意：总是在特性模块中调用 RouterModule.forChild 。
 */