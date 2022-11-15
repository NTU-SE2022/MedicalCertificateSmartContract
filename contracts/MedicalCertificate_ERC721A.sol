// SPDX-License-Identifier: MIT
import "https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "./I_MedicalCertificate.sol";
contract MedicalCertificate is ERC721A, Ownable, I_MedicalCertificate{
    function addCertificate(string memory certificate, address patient) external{
        _mint(patient, certificate);
    }
    function getCertificate(uint256 id) external view returns(string memory certificate);
    function listCertificatesIdOfAddress(address _address) external view returns(uint256[] memory certificateIds);

}