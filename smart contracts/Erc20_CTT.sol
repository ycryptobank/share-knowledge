// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract CTT is ERC20PresetMinterPauser {
	constructor() ERC20PresetMinterPauser("CTT", "Curcifer Test Token") {}
}