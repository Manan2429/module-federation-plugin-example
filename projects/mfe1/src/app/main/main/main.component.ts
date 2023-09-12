import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Component, NgModule, NgModuleRef, createNgModuleRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
//   async ngOnInit() {
//     const appModule: NgModule = await loadRemoteModule(
//     {
//      remoteEntry: '',
//      remoteName: 'main',
//      exposedModule: './AppModule',
//     }
//    );
//    const appModuleRef: NgModuleRef<any> = createNgModuleRef<any>(
//     appModule['AppModule'],
//     this.injector
//    );
//    const microFEComponent = this.vcref.createComponent(
//     appModuleRef.instance.getComponent()
//    );
//   // Sample interaction with the component.
//   this.renderer.listen('window', 'message', (event) => {
//     if (event.data && event.data.providerId) {
//       this.microFEClicked.emit(event.data);
//     }
//    });
// }
}
