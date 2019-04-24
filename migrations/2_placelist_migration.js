var PlaceList = artifacts.require("./PlaceList.sol");

module.exports = function(deployer) {
  deployer.deploy(PlaceList).then(instance => {
    console.log('ABI:',JSON.stringify(instance.abi))
  })  
};