//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract KakiCoin is ERC777 {
    constructor(uint256 initialSupply, address[] memory defaultOperators)
        public
        ERC777("KakiCoin", "OYSTER", defaultOperators)
    {
        _mint(msg.sender, initialSupply, "", "");
    }
}
