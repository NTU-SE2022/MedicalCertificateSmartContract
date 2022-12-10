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
    await MCinstance.addCertificate("headache", "HIGH",accountA, {from: contractOwner})
    numberOfCertificates = (
      await MCinstance.listCertificatesIdOfAddress.call(accountA)
    ).length;
    assert.equal(numberOfCertificates, 1, "Certificate didn't send to account");
  });
  it("should report error if symptoms len neq levels len", async () => {
    const MCinstance = await MC.deployed();
    try{
      await MCinstance.addCertificate("headache,aa", "HIGH", accountA, {from: contractOwner});
      assert.equal(0, 0, "Symptom len neq levels len passed");
    }
    catch(e){
    }
    try{
      await MCinstance.addCertificate("headache", "HIGH,A", accountA, {from: contractOwner});
      assert.equal(0, 0, "Symptom len neq levels len passed");
    }
    catch(e){
    }
  });

  it("NFT should contain desired texts", async () => {
    const MCinstance = await MC.deployed();
    var symptomsText = await MCinstance.getSymptoms.call(0)
    assert.equal(symptomsText, "headache", "Certificate didn't contain desired text");
    var levelsText = await MCinstance.getLevels.call(0)
    assert.equal(levelsText, "HIGH", "Certificate didn't contain desired text");
  });

  it("listCertificate OK", async () => {
    const MCinstance = await MC.deployed();
    await MCinstance.addCertificate("t1","H",accountB, {from: contractOwner})
    await MCinstance.addCertificate("t2","H",accountA, {from: contractOwner})
    // await MCinstance.addCertificate("test",accountA, {from: contractOwner})
    var certificateList = (await MCinstance.listCertificatesIdOfAddress.call(accountA));
    assert.equal(certificateList.length, 2, "Number of certificate is wrong");
    assert.equal(certificateList[0], 0, "the first id is wrong");
    assert.equal(certificateList[1], 2, "the second id is wrong");
  });
  it("For those who didn't get NFT, listCertificatesIdOfAddress should return empty list", async () => {
    const MCinstance = await MC.deployed();
    var numberOfCertificates = (
      await MCinstance.listCertificatesIdOfAddress.call(accounts[3])
    ).length;
    assert.equal(numberOfCertificates, 0, "Balance isn't 0!");
  });
  it("cleanAllCertificate OK", async () => {
    const MCinstance = await MC.deployed();
    await MCinstance.cleanAllCertificate(accountA, {from: contractOwner});
    var numberOfCertificates = (
      await MCinstance.listCertificatesIdOfAddress.call(accountA)
    ).length;
    assert.equal(numberOfCertificates, 0, "Certificate didn't cleaned");
  });
  it("Only the owner can call addCertificate and cleanAllCertificate", async () => {
    const MCinstance = await MC.deployed();
    try{
      await MCinstance.addCertificate("test","H",accountA, {from: accountA})
      assert.equal(0, 0, "A regular user added a certificate");
    }
    catch(e){
    }

    try{
      await MCinstance.cleanAllCertificate(accountA, {from: accountA})
      assert.equal(0, 0, "A regular user cleans certificates");
    }
    catch(e){
    }
  });

  

});