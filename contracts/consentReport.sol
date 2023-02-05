// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;


import "hardhat/console.sol";

contract ConsentRecord {
    struct Record {
        string userId;
        string dataType;
        string recipientId;
        string timestamp;
    }
    Record[] public records;

    function addRecord(
        string memory _userId,
        string memory _dataType,
        string memory _recipientId,
        string memory _timestamp
    ) public {
        Record memory newRecord = Record({
            userId: _userId,
            dataType: _dataType,
            recipientId: _recipientId,
            timestamp: _timestamp
        });
        records.push(newRecord);
    }

    function removeRecord(
        string memory _userId,
        string memory _dataType,
        string memory _recipientId
    ) public {
        for (uint i = 0; i < records.length; i++) {
            if (
                keccak256(abi.encodePacked(records[i].userId)) ==
                keccak256(abi.encodePacked(_userId)) &&
                keccak256(abi.encodePacked(records[i].dataType)) ==
                keccak256(abi.encodePacked(_dataType)) &&
                keccak256(abi.encodePacked(records[i].recipientId)) ==
                keccak256(abi.encodePacked(_recipientId))
            ) {
                delete records[i];
            }
        }
    }

    function checkRecord(
        string memory _userId,
        string memory _dataType,
        string memory _recipientId
    ) public view returns (bool) {
        for (uint i = 0; i < records.length; i++) {
            if (
                keccak256(abi.encodePacked(records[i].userId)) ==
                keccak256(abi.encodePacked(_userId)) &&
                keccak256(abi.encodePacked(records[i].dataType)) ==
                keccak256(abi.encodePacked(_dataType)) &&
                keccak256(abi.encodePacked(records[i].recipientId)) ==
                keccak256(abi.encodePacked(_recipientId))
            ) {
                return true;
            }
        }
        return false;
    }
}
