// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Report {

    struct report{
        address _flaggedby;
        address _tokenAddress;
        string _tokenName;
        string _description;
        uint256 count;
    }
    uint256 public ct = 0;
    report[] public Reports;
    function regUser(address tokenAddress,string memory tokenName,string memory description) public returns(bool)
    { 
        Reports.push(report(msg.sender,tokenAddress,tokenName,description,ct));
        ct+=1;
        return true;
    }

    function ccount() public view returns (uint256)
    {
        return ct;
    }
}