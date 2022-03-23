const { setup: setupDevServer } = require('jest-dev-server');

module.exports = async function globalSetup() {
  await setupDevServer({
    command: 'ts-node-dev --poll ./src/main.ts',
    launchTimeout: 50000,
  });

  console.log("Server Started");
}