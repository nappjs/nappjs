import { NappJS } from "../";
export interface NappJSModuleContructor {
    new (...any: any[]): NappJSModule;
}
export declare class NappJSModule {
}
export declare class NappJSServiceContainer {
    name: string;
    private path;
    protected module: NappJSModuleContructor;
    dependencies: string[];
    constructor(name: string, path: string, module: NappJSModuleContructor, dependencies: string[]);
    register(napp: NappJS): void;
}
export declare class NappJSScriptContainer {
    name: string;
    private path;
    protected module: NappJSModuleContructor;
    constructor(name: string, path: string, module: NappJSModuleContructor);
    register(napp: NappJS): void;
}
