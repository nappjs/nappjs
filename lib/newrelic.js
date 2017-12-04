process.env.NEW_RELIC_NO_CONFIG_FILE = true;

if (!process.env.NEW_RELIC_APP_NAME) {
  // provide defaults for kontena service
  if (process.env.KONTENA_STACK_NAME) {
    process.env.NEW_RELIC_APP_NAME = `${process.env.KONTENA_STACK_NAME}-${
      process.env.KONTENA_SERVICE_NAME
    }`;
  }
}

if (process.env.NEW_RELIC_LICENSE_KEY) require("newrelic");
