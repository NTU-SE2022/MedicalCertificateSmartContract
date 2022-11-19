import “truffle/Assert.sol”; 
import “truffle/DeployedAddresses.sol”; 
import "../contracts/MedicalCertificate_ERC721.sol";
contract TestMC{
    MedicalCertificate mc = MedicalCertificate(DeployedAddresses.MedicalCertificate());
    function testAddCertificate() public{
        mc.addCertificate(“test”, address(this));
        Assert.equal(mc.getCertificate(0), “test”, “Certificate should be test”);
    }
    function testListCertificatesIdOfAddress() public{
        uint256[] memory certificateIds = mc.listCertificatesIdOfAddress(address(this));
        Assert.equal(certificateIds[0], 0, “Certificate id should be 0”);
    }
}