// import “truffle/Assert.sol”; 
// import “truffle/DeployedAddresses.sol”; 
// import "../contracts/MedicalCertificate_ERC721.sol";
// contract TestMC{
//     MedicalCertificate mc = MedicalCertificate(DeployedAddresses.MedicalCertificate());
//     function testAddCertificate() public{
//         mc.addCertificate(“test”, address(this));
//         Assert.equal(mc.getCertificate(0), “test”, “Certificate should be test”);
//     }
//     function testListCertificatesIdOfAddress() public{
//         mc.addCertificate(“1”, address(this));
//         mc.addCertificate(“2”, address(this));
//         uint256[] memory certificateIds = mc.listCertificatesIdOfAddress(address(this));
//         Assert.equal(certificateIds[0], 0, “Certificate id should be 0”);
//         Assert.equal(certificateIds[0], 1, “Certificate id should be 0”);
//     }
// }

const MC = artifacts.require("MedicalCertificate");
contract("MedicalCertificate", accounts => {
  var contractOwner = accounts[0];
  var accountA = accounts[1];
  var accountB = accounts[2];

  it("should send NFT to specified account", async () => {
    const MCinstance = await MC.deployed();
    var numberOfCertificates = (
      await MCinstance.listCertificatesIdOfAddress.call(accountA)
    ).length;
    assert.equal(numberOfCertificates, 0, "balance isn't 0 in the begining");
    await MCinstance.addCertificate("test",accountA, {from: contractOwner})
    numberOfCertificates = (
      await MCinstance.listCertificatesIdOfAddress.call(accountA)
    ).length;
    assert.equal(numberOfCertificates, 1, "Certificate didn't send to account");
  });

  it("NFT should contain desired texts(i.e. addCertificate and getCertificate O.K.)", async () => {
    const MCinstance = await MC.deployed();
    var certificateText = await MCinstance.getCertificate.call(0)
    assert.equal(certificateText, "test", "Certificate didn't contain desired text");
  });

  it("listCertificate OK", async () => {
    const MCinstance = await MC.deployed();
    await MCinstance.addCertificate("t1",accountB, {from: contractOwner})
    await MCinstance.addCertificate("t2",accountA, {from: contractOwner})
    // await MCinstance.addCertificate("test",accountA, {from: contractOwner})
    var certificateList = (await MCinstance.listCertificatesIdOfAddress.call(accountA));
    assert.equal(certificateList.length, 2, "Number of certificate is wrong");
    assert.equal(certificateList[0], 0, "the first id is wrong");
    assert.equal(certificateList[1], 2, "the second id is wrong");
  });

});