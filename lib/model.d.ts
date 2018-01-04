import { NappJS } from './napp';
export declare class NappJSModule {
    name: string;
    private path;
    protected module: any;
    constructor(name: string, path: string);
    load(app: NappJS): Promise<any>;
    preRegister(app: NappJS, ...args: any[]): Promise<void>;
    register(app: NappJS, ...args: any[]): Promise<void>;
    postRegister(app: NappJS, ...args: any[]): Promise<void>;
    preStart(app: NappJS, ...args: any[]): Promise<any>;
    start(app: NappJS, ...args: any[]): Promise<any>;
    postStart(app: NappJS, ...args: any[]): Promise<any>;
    preStop(app: NappJS, ...args: any[]): Promise<any>;
    stop(app: NappJS, ...args: any[]): Promise<any>;
    postStop(app: NappJS, ...args: any[]): Promise<any>;
}
