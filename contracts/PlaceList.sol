pragma solidity >=0.4.21 <0.6.0;
contract PlaceList {
  uint public placeCount = 0;
  uint public userCount = 0;
  // ? publicで良いのか？ 
  address public admin;

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

  mapping(uint => Place) public places;
  mapping(uint => Checkin) public checkins;
  // Place[] public places;
  // Checkin[] public checkins;

  event CreatePlace(
    uint _id,
    address indexed _owner, 
    string _name, 
    string _latitude, 
    string _longitude 
  );

  event UserCheckIn(
    uint _placeid,
    address _user,
    uint _checkintime,
    string _latitude,
    string _longitude
  );

  constructor() public {
    admin = msg.sender;
  }

  function createPlace(string memory _name, string memory _ipfsHash, string memory _latitude, string memory _longitude) public {
    placeCount ++;
    places[placeCount] = Place(placeCount, msg.sender, _name, _ipfsHash, _latitude, _longitude);
    //places.push(Place(msg.sender, _name, false, _latitude, _longitude));
  }

  function userCheckIn(uint placeid, string memory _latitude, string memory _longitude) public {
    userCount ++;
    checkins[userCount] = Checkin(placeid, msg.sender, now, _latitude, _longitude);
    //checkins.push(Checkin(placeid, msg.sender, now, _latitude, _longitude));
  } 

}