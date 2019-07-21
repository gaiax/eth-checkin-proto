pragma solidity ^0.5.0;
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";
import "../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract TraceableToken is ERC721, ERC721Metadata {
  using SafeMath for uint;

  uint256 internal tokenId = 0;
  
  mapping (uint256 => string) public tokenName;
  mapping (uint256 => uint256[]) public referencedTokenIds;
  mapping (uint256 => mapping (uint256 => uint256)) public distributeRate;

  event TransferEther(address indexed from, address indexed to, uint256 indexed amount);

  constructor() public ERC721Metadata("GX Token", "GX") {

  }

  function mint(string memory _ipfsHash, string memory _tokenName, uint256[] memory _referencedIds, uint256[] memory _distributeRate) public {
    tokenId = tokenId.add(1);
    super._mint(msg.sender, tokenId);
    setTokenURI(tokenId, _ipfsHash);
    setTokenName(tokenId, _tokenName);
    setRereferencedTokenId(tokenId, _referencedIds, _distributeRate);
  }

  function setTokenURI(uint256 _tokenId, string memory _ipfsHash) internal {
    super._setTokenURI(_tokenId, _ipfsHash);
  }

  function setTokenName(uint256 _tokenId, string memory _tokenName) internal {
    tokenName[_tokenId] = _tokenName;
  }


  function getTokenName(uint256 _tokenId) external view returns(string memory) {
    return tokenName[_tokenId];
  }

  function setRereferencedTokenId(uint256 _tokenId, uint256[] memory _referencedIds, uint256[] memory _distributeRate) internal {
    require(_exists(_tokenId));
    if ( _referencedIds.length > 0 ) {
      require(_referencedIds.length + 1 == _distributeRate.length);
    } else {
      require(_referencedIds.length == _distributeRate.length);
    }
    for (uint i = 0; i < _referencedIds.length; i++) {
      require(_exists(_referencedIds[i]));
    }
    referencedTokenIds[_tokenId] = _referencedIds;
    //総和が100 分配率も同時に記録
    if (_distributeRate.length == 0) {
      distributeRate[_tokenId][_tokenId] = 100;
    } else {
      uint sum = 0;
      for (uint j = 0; j < _distributeRate.length; j++) {
        sum += _distributeRate[j];                        
      }
      require(sum <= 100);
      distributeRate[_tokenId][_tokenId] = _distributeRate[0];
      for (uint k = 1; k < _distributeRate.length; k++) {
        distributeRate[_tokenId][_referencedIds[k-1]]= _distributeRate[k];
      }
    }
  }

  function updateRereferencedTokenId(uint256 _tokenId, uint256[] calldata _referencedIds, uint256[] calldata _distributeRate) external {
    require(_exists(_tokenId));
    if ( _referencedIds.length > 0 ) {
      require(_referencedIds.length + 1 == _distributeRate.length);
    } else {
      require(_referencedIds.length == _distributeRate.length);
    }
    address _tokenOwner = address(uint160(ownerOf(_tokenId)));
    require(_tokenOwner == msg.sender);
    for (uint l = 0; l < _referencedIds.length; l++) {
      require(_exists(_referencedIds[l]));
    }
    referencedTokenIds[_tokenId] = _referencedIds;
    // 総和が100 分配率も同時に記録
    uint sum = 0;
    for (uint m = 0; m < _distributeRate.length; m++) {
      sum += _distributeRate[m];                        
    }
    require(sum <= 100);
    distributeRate[_tokenId][_tokenId] = _distributeRate[0];
    for (uint n = 0; n < _distributeRate.length; n++) {
      distributeRate[_tokenId][_referencedIds[n-1]]= _distributeRate[n];
    }
  }

  function getRereferencedTokenId(uint256 _tokenId) public view returns (uint256[] memory) {
    require(_exists(_tokenId));
    uint256[] memory result = referencedTokenIds[_tokenId];
    return result;
  }

  function sendEther(uint256 _tokenId) public payable {
    uint256 amount = msg.value;
    forLoop(_tokenId, amount);
  }

  function forLoop(uint256 _tokenId, uint256 _amount) public payable {
    address payable _tokenOwner = address(uint160(ownerOf(_tokenId)));
    uint256 _amountForOwner = distributeRate[_tokenId][_tokenId];
    _tokenOwner.transfer(_amount.mul(_amountForOwner).div(100));
    emit TransferEther(msg.sender, _tokenOwner, _amount.mul(_amountForOwner).div(100));
    uint[] memory refIds = getRereferencedTokenId(_tokenId); 
    if (refIds.length > 0 ) {
      for (uint i = 0; i < refIds.length; i++ ) {
        uint rate = distributeRate[_tokenId][refIds[i]];
        uint amountForLayer = _amount.mul(rate).div(100);
        forLoop(refIds[i], amountForLayer);
      }
    }
  }


  function numberOfToken() external view returns(uint256) {
    return tokenId;
  }
}