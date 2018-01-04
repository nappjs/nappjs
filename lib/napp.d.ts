import { NappJSModule } from './model';
export declare class NappJS {
    locals: {
        [id: string]: any;
    };
    private plugins;
    private middlewares;
    private scripts;
    addMiddleware(name: string, path: string): Promise<void>;
    addPlugin(name: string, path: string): Promise<void>;
    load(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    runScript(name: string, ...args: any[]): Promise<any>;
    findPlugin(name: string): NappJSModule | null;
    findMiddleware(name: string): NappJSModule | null;
    findScript(name: string): NappJSModule | null;
}
