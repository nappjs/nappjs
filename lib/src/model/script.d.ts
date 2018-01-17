import { NappJS } from '../../';
import { NappJSModule, NappJSScriptContainer } from './module';
export declare const createNappJSScript: (name: string, path: string) => NappJSScriptContainer;
export declare class NappJSScript extends NappJSModule {
    run(app: NappJS, ...args: any[]): Promise<void>;
}
