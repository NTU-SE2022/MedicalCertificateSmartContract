var MCcontract = artifacts.require("MedicalCertificate");
module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MCcontract);
};