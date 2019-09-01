const fs = require("fs");
const path = require("path");
const en = require("./src/lang/en.json");
const overrides = require("./src/lang/en.mystore.json");

const apply = (messages, overrides) => {
  return Object.keys(overrides).reduce((acc, key) => {
    if (acc.hasOwnProperty(key) && overrides.hasOwnProperty(key)) {
      acc[key] = overrides[key];
    }
    return acc;
  }, messages);
};

const data = apply(en, overrides);

fs.writeFileSync(
  path.join(__dirname, "src", "lang", "en.mystore.dist.json"),
  JSON.stringify(data, null, 2)
);
