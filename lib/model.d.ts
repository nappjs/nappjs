import { NappJS } from './napp';
export declare const createNappJSModule: (name: string, path: string) => NappJSModule;
export declare class NappJSModule {
    name: string;
    private path;
    protected module: any;
    constructor(name: string, path: string, module: any | null);
    load(app: NappJS): Promise<any>;
    preRegister(app: NappJS, ...args: any[]): Promise<void>;
    register(app: NappJS, ...args: any[]): Promise<void>;
    postRegister(app: NappJS, ...args: any[]): Promise<void>;
    preStart(app: NappJS, ...args: any[]): Promise<void>;
    start(app: NappJS, ...args: any[]): Promise<void>;
    postStart(app: NappJS, ...args: any[]): Promise<void>;
    preStop(app: NappJS, ...args: any[]): Promise<void>;
    stop(app: NappJS, ...args: any[]): Promise<void>;
    postStop(app: NappJS, ...args: any[]): Promise<void>;
}
