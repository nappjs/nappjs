import { NappJSModule, NappJSScriptContainer } from "./module";
import { NappJS } from "../";
export declare const createNappJSScript: (name: string, path: string) => NappJSScriptContainer;
export declare class NappJSScript extends NappJSModule {
    run(app: NappJS, ...args: any[]): Promise<void>;
}
