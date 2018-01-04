import * as fs from "fs"
import * as path from "path"
import { NappJSModule } from './model'


export const loadMiddlewares = () => {
  console.log("searching for middlewares...");

  const middlewaresPath = path.resolve(
    process.env.MIDDLEWARES_PATH || "./middlewares/"
  );

  let middlewares: NappJSModule[] = []

  let paths: string[] = [];
  if (fs.existsSync(middlewaresPath)) {
    paths = fs.readdirSync(middlewaresPath);
  }

  paths.forEach(file => {
    const middlewarePath = path.join(middlewaresPath, file);
    const name = file.replace('.js','')
    middlewares.push(new NappJSModule(name,middlewarePath))
  });

  if (middlewares.length === 0) {
    console.log("no middlewares found");
  } else {
    console.log("middlewares found:", middlewares.map(x => x.name).join(', '));
  }
  return middlewares
}