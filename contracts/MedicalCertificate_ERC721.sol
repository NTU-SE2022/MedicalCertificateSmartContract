// SPDX-License-Identifier: MIT
// // from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
// import "./ERC721.sol";
// // from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
// import "./Ownable.sol";
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./I_MedicalCertificate.sol";
contract MedicalCertificate is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, I_MedicalCertificate{
    using Counters for Counters.Counter;
    Counters.Counter private _idCounter;
    mapping (uint256 => string) private symptomsStorage;
    mapping (uint256 => string) private levelsStorage;
 
    constructor() ERC721("MedicalCertificate", "MC") {}
    function addCertificate(string calldata symptoms, string calldata levels, address patient) external onlyOwner{
        uint256 id = _idCounter.current();
        _idCounter.increment();
        _safeMint(patient, id);
        symptomsStorage[id] = symptoms;
        levelsStorage[id] = levels;
    }
    function getSymptoms(uint256 id) external view returns(string memory symptoms){
        return symptomsStorage[id];
    }
    function getLevels(uint256 id) external view returns(string memory levels){
        return levelsStorage[id];
    }
    function listCertificatesIdOfAddress(address _address) external view returns(uint256[] memory certificateIds){
        uint256 numberOfCertificates = balanceOf(_address);
        uint256[] memory ret = new uint256[](numberOfCertificates);
        for(uint256 i=0; i<numberOfCertificates; i++){
            ret[i] = tokenOfOwnerByIndex(_address, i);
        }
        return ret;
    }
    function cleanAllCertificate(address patient) external onlyOwner{
        uint256 numberOfCertificates = balanceOf(patient);
        for(uint256 i=0; i<numberOfCertificates; i++){
            _burn(tokenOfOwnerByIndex(patient, 0));
        }
    }


    function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {ERC721Enumerable._beforeTokenTransfer(from, to, firstTokenId, batchSize);}
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage){ERC721URIStorage._burn(tokenId);}
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool){return ERC721Enumerable.supportsInterface(interfaceId);}
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory){return ERC721URIStorage.tokenURI(tokenId);}
    
}