import * as assert from 'assert';
import * as Bottle from 'bottlejs';
import { CronJob } from 'cron';

import { loadMiddlewares } from './middlewares';
import { createNappJSService, NappJSScript, NappJSService } from './model';
import { loadPlugins } from './plugins';
import { loadScripts } from './scripts';
import { HealthCheckData } from './healthcheck';

export class NappJS {
  private services: Bottle = new Bottle();
  private scripts: Bottle = new Bottle();

  public addService(name: string, service: any, ...dependencies: string[]) {
    this.services.service(
      name,
      (...args: any[]) => {
        if (service instanceof NappJSService) {
          return service;
        }
        return new service(...args);
      },
      ...dependencies
    );
  }

  public getService<T extends NappJSService>(name: string): T {
    let val = this.services.container[name];
    assert.ok(val, `service ${name} not registered`);
    assert.ok(
      val instanceof NappJSService,
      `injected module ${name} is not instance of NappJSService`
    );
    return val;
  }

  public addScript(name: string, script: any) {
    this.scripts.service(name, (...args: any[]) => {
      if (script instanceof NappJSScript) {
        return script;
      }
      return new script(...args);
    });
  }
  public getScript<T extends NappJSScript>(name: string): NappJSScript {
    let val = this.scripts.container[name];
    assert.ok(val, `script ${name} not registered`);
    assert.ok(
      val instanceof NappJSScript,
      `injected module ${name} is not instance of NappJSScript`
    );
    return val;
  }

  private pluginWrappers = loadPlugins();
  private middlewareWrappers = loadMiddlewares();
  private scriptWrappers = loadScripts();

  public async addMiddleware(name: string, path: string) {
    this.middlewareWrappers.push(createNappJSService(name, path));
  }

  public async addPlugin(name: string, path: string) {
    this.pluginWrappers.push(createNappJSService(name, path));
  }

  private loaded = false;
  public async load(): Promise<void> {
    if (this.loaded) return;
    let all = this.pluginWrappers.concat(this.middlewareWrappers);
    for (let v of all) {
      v.register(this);
    }
    for (let s of this.scriptWrappers) {
      s.register(this);
    }
    for (let v of all) {
      let s = this.getService<NappJSService>(v.name);
      await s.load(this);
    }
    this.loaded = true;
  }

  public async start(): Promise<void> {
    await this.load();
    let all = this.pluginWrappers.concat(this.middlewareWrappers);
    for (let v of all) {
      let s = this.getService<NappJSService>(v.name);
      await s.start(this);
    }
  }

  public async stop(): Promise<void> {
    let all = this.pluginWrappers.concat(this.middlewareWrappers);
    for (let v of all) {
      let s = this.getService<NappJSService>(v.name);
      await s.stop(this);
    }
  }

  public async runScript(name: string, ...args: any[]): Promise<any> {
    let script = this.getScript<NappJSScript>(name);
    if (script === null) throw new Error(`script ${name} not found`);
    return script.run(this, ...args);
  }

  public async startCron(
    crontime: string,
    timezone: string | undefined,
    name: string,
    ...args: any[]
  ): Promise<any> {
    let script = this.getScript<NappJSScript>(name);
    if (script === null) throw new Error(`script ${name} not found`);

    let cron = new CronJob(
      crontime,
      async () => {
        await script.run(this, ...args);
      },
      null,
      true,
      timezone
    );
    return cron;
  }

  public async getHealthCheckData(): Promise<HealthCheckData> {
    let result = {};
    for (let serviceName of this.services.container.$list()) {
      let service = this.services.container[serviceName];

      let hc = await service.getHealthCheckData(this);
      for (let key in hc) {
        result[key] = hc[key];
      }
    }

    return result;
  }
}
