pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";

contract StableCoin is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable, ERC20Pausable{

    constructor(address _minter,uint _defAmount)
        ERC20Mintable()
        ERC20Detailed("StableCoin", "STC", 8)
        public
    {
        //msg.senderはsuper contractで自動的にminterになるため
        if(_minter != msg.sender) {
            _addMinter(_minter);
        }
        _mint(_minter,_defAmount);
    }
}