const lang = (locale, project) => {
  let result;

  if (locale === "en" && project === "mystore.dist") {
    result = import("./en.mystore.dist.json");
  } else {
    switch (locale) {
      case "sv":
        result = import("./sv.json");
        break;

      default:
        result = import("./en.json");
        break;
    }
  }

  return result.then(applyOverride(locale, project));
};

const applyOverride = (locale, project) => messages => {
  let result = Promise.resolve(messages);

  if (locale === "en" && project === "mystore") {
    result = import("./en.mystore.json").then(apply(messages));
  }

  return result;
};

const apply = messages => overrides => {
  return Object.keys(overrides).reduce((acc, key) => {
    if (acc.hasOwnProperty(key) && overrides.hasOwnProperty(key)) {
      acc[key] = overrides[key];
    }
    return acc;
  }, messages);
};

module.exports = lang;
