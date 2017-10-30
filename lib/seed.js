const fs = require("fs");
const path = require("path");

const seedPath = path.resolve("./seed");

const importSeed = async (db, seed) => {
  const context = db.createContext();
  const files = fs.readdirSync(path.join(seedPath, seed));

  for (let file of files) {
    await _processSeedFile(context, path.join(seedPath, seed, file));
  }

  return context.saveAndDestroy();
};

const _processSeedFile = async (context, filePath) => {
  const entityName = path
    .basename(filePath)
    .replace(path.extname(filePath), "");

  console.log(`importing ${path.basename(filePath)} -> ${entityName}`);
  const data = require(filePath);

  if (!Array.isArray(data)) {
    throw new Error("data is not an array");
  }

  for (let itemData of data) {
    if (itemData.id) {
      await context.getOrCreateObject(
        entityName,
        { where: { id: itemData.id } },
        itemData
      );
    } else {
      context.create(entityName, itemData);
    }
  }
};

module.exports = {
  import: importSeed
};
