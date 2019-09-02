const StableCoin = artifacts.require("StableCoin");

module.exports = function(deployer) {
  //minter = admin address of stable coin
  const minter = "0x683f146d1d29148baAdC750271737086D28eb066" ;
  const defAmount = 100000000
  deployer.deploy(StableCoin,minter,defAmount) ;
};
