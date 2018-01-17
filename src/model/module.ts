import { NappJS } from '../../';

// import { NappJSScript } from './script';
// import { NappJSService } from './service';

export interface NappJSModuleContructor {
  new (...any: any[]): NappJSModule;
}

export class NappJSModule {
  // constructor(...any: any[]) {}
}

export class NappJSServiceContainer {
  public name: string;
  private path: string;
  protected module: NappJSModuleContructor;
  public dependencies: string[]
  constructor(name: string, path: string, module: NappJSModuleContructor, dependencies: string[]) {
    this.name = name;
    this.path = path;
    this.module = module;
    this.dependencies = dependencies;
  }

  register(napp: NappJS)  {
      napp.addService(this.name, this.module, ...(this.dependencies || []));
  };
}

export class NappJSScriptContainer {
  public name: string;
  private path: string;
  protected module: NappJSModuleContructor;
  constructor(name: string, path: string, module: NappJSModuleContructor) {
    this.name = name;
    this.path = path;
    this.module = module;
  }

  register(napp: NappJS)  {
      napp.addScript(this.name, this.module);
  };
}