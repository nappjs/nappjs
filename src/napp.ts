import { loadMiddlewares } from './middlewares'
import { loadPlugins } from './plugins'
import { loadScripts } from './scripts'
import { NappJSModule } from './model'

export class NappJS {

    public locals: {[id: string]: any} = {}

    private plugins = loadPlugins()
    private middlewares = loadMiddlewares()
    private scripts = loadScripts()

    public async addMiddleware(name: string, path: string) {
        this.middlewares.push(new NappJSModule(name, path))
    }

    public async addPlugin(name: string, path: string) {
        this.plugins.push(new NappJSModule(name, path))
    }

    public async load(): Promise<void> {
        let all = this.plugins.concat(this.middlewares).concat(this.scripts)
        for (let v of all) {
            await v.load(this)
        }
        for (let v of all) {
            await v.register(this)
        }
    }

    public async start(): Promise<void> {
        let all = this.plugins.concat(this.middlewares)
        for (let v of all) {
            await v.start(this)
        }
    }

    public async runScript(name: string, ...args: any[]): Promise<any> {
        let script = this.findScript(name)

        if (script === null) throw new Error(`script ${name} not found`)

        return script.start(this, ...args)
    }

    // searching
    public findPlugin(name: string): NappJSModule | null {
        return this.middlewares.reduce((prev, curr)=>{
            return prev || (curr.name === name ? curr : null)
        },null)
    }
    public findMiddleware(name: string): NappJSModule | null {
        return this.middlewares.reduce((prev, curr)=>{
            return prev || (curr.name === name ? curr : null)
        },null)
    }
    public findScript(name: string): NappJSModule | null {
        return this.scripts.reduce((prev, curr)=>{
            return prev || (curr.name === name ? curr : null)
        },null)
    }
}
