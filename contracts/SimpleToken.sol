// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    mapping(address => uint256) private balances;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor(uint256 initialSupply) {
        balances[msg.sender] = initialSupply;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount,"Insufficient balance");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        
        return true;
    }
    
    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }
}