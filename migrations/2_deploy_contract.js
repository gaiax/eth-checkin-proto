var TraceableToken = artifacts.require("./TraceableToken.sol");

module.exports = async function(deployer) {
   deployer.deploy(TraceableToken);
};
