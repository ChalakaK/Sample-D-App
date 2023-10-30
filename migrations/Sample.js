const Sample = artifacts.require("contracts/SampleContract.sol");

module.exports = function (deployer) {
    deployer.deploy(Sample);
};