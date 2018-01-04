import { NappJSModule } from './model';
export declare class NappJS {
    locals: {
        [id: string]: any;
    };
    private plugins;
    private middlewares;
    private scripts;
    load(): Promise<void>;
    start(): Promise<void>;
    runScript(name: string, ...args: any[]): Promise<any>;
    findPlugin(name: string): NappJSModule | null;
    findMiddleware(name: string): NappJSModule | null;
    findScript(name: string): NappJSModule | null;
}
