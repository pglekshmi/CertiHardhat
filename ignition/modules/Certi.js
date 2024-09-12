const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("certModule", (m) => {

  const certi = m.contract("Cert");

  return { certi };
});
