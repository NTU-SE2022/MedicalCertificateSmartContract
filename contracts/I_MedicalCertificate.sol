// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
interface MedicalCertificate {
    enum SymptomLevel { HEALTH, LOW, MEDIUM, HIGH }
    function addCertificate(string calldata certificate, address patient) external;
    function getCertificate(uint256 id) external view returns(string memory certificate);
    function listCertificatesIdOfAddress(address patient) external view returns(uint256[] memory certificateIds);
}