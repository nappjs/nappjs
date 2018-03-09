import { NappJSScript, NappJSService } from "./model";
export declare class NappJS {
    private services;
    private scripts;
    addService(name: string, service: any, ...dependencies: string[]): void;
    getService<T extends NappJSService>(name: string): T;
    addScript(name: string, script: any): void;
    getScript<T extends NappJSScript>(name: string): NappJSScript;
    private pluginWrappers;
    private middlewareWrappers;
    private scriptWrappers;
    addMiddleware(name: string, path: string): Promise<void>;
    addPlugin(name: string, path: string): Promise<void>;
    private loaded;
    load(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    runScript(name: string, ...args: any[]): Promise<any>;
    startCron(crontime: string, timezone: string | undefined, name: string, ...args: any[]): Promise<any>;
}
