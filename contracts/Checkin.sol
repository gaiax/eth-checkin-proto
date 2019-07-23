pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

contract Checkin {
  uint public placeCount = 0;
  uint public checkinCount = 0;
  address internal admin;

  struct User {
    string userName;
    string ipfsHash;
  }

  struct Place {
    uint id;
    address owner;
    string name;
    string ipfsHash;
    string latitude;
    string longitude;
  }
  
  struct Checkin {
    uint placeid;
    address user;
    uint checkintime;
    string latitude;
    string longitude;
  }

  Place[] public places;
  Checkin[] internal checkins;
  mapping(address => User) public users;

  event CreatePlace (uint _id, address indexed _owner, string _name, string _ipfsHash, string _latitude, string _longitude);
  event CheckIn( uint _placeid, address _user, uint _checkintime, string _latitude, string _longitude);
  event CreateUser (string userName, string ipfsHash);

  constructor() public {
    admin = msg.sender;
  }

  function createUser(string memory _userName, string memory _ipfsHash) public {
    users[msg.sender] = User(_userName, _ipfsHash);
    emit CreateUser(_userName, _ipfsHash);
  } 

  function getAdmin(address _from) external view returns(address) {
    require(admin == _from);
    return admin;
  }

  function createPlace(string memory _name, string memory _ipfsHash, string memory _latitude, string memory _longitude) public {
    placeCount ++;
    places.push(Place(placeCount, msg.sender, _name, _ipfsHash, _latitude, _longitude));
    emit CreatePlace(placeCount, msg.sender, _name, _ipfsHash, _latitude, _longitude);
  }

  function userCheckIn(uint placeid, string memory _latitude, string memory _longitude) public {
    checkins.push(Checkin(placeid, msg.sender, now, _latitude, _longitude));
    emit CheckIn(placeid, msg.sender, now, _latitude, _longitude);
  } 

  function getNumberOfCheckin() external view returns (uint) {
    return checkins.length;
  }

  function getNumberOfPlace() external view returns (uint) {
    return places.length;
  }

  function getCheckinListForUser(uint _id, address _user) external view returns(Checkin memory) {
    if (checkins[_id].user == _user) {
      return checkins[_id]; 
    }
  }

  function getCheckinListForOwner(uint _id, uint _placeid) external view returns(Checkin memory) {
    if (checkins[_id].placeid == _placeid) {
      return checkins[_id]; 
    }
  }

  function getAllCheckinList(uint _id, address _user) external view returns(Checkin memory) {
    require(_user == admin);
    return checkins[_id]; 
  }

  function getNumberOfVisiters(uint _placeid) public view returns(uint) {
    uint counter = 0;
    for (uint i = 0; i < checkins.length; i++) {
      if (checkins[i].placeid == _placeid) {
        counter++;
      }
    }
    return counter;
  }
}