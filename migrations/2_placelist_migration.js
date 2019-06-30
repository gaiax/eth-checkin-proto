var Checkin = artifacts.require("./Checkin.sol");

module.exports = function(deployer) {
  deployer.deploy(Checkin).then(instance => {
    console.log('ABI:',JSON.stringify(instance.abi))
  })  
};