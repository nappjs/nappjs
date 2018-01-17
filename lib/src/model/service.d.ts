import { NappJS } from '../../';
import { NappJSModule, NappJSServiceContainer } from './module';
export declare const createNappJSService: (name: string, path: string) => NappJSServiceContainer;
export declare class NappJSService extends NappJSModule {
    static dependencies: string[];
    load(app: NappJS, ...args: any[]): Promise<void>;
    start(app: NappJS, ...args: any[]): Promise<void>;
    stop(app: NappJS, ...args: any[]): Promise<void>;
}
