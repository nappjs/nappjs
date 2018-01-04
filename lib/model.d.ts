import { NappJS } from './napp';
export declare class NappJSModule {
    name: string;
    private path;
    protected module: any;
    constructor(name: string, path: string);
    load(app: NappJS): Promise<any>;
    register(app: NappJS): Promise<void>;
    start(app: NappJS, ...args: any[]): Promise<any>;
    stop(app: NappJS): Promise<any>;
}
