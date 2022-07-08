var MainFoodSupplyChain = artifacts.require("./MainFoodSupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(MainFoodSupplyChain);
};
