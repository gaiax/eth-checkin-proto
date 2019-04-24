pragma solidity >=0.4.21 <0.6.0;
contract PlaceList {
  uint public placeCount = 0;
  uint public userCount = 0;

  struct Place {
    uint id;
    address owner;
    string name;
    bool completed;
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

  constructor() public {
    
  }

  function createPlace(string memory _name, string memory _latitude, string memory _longitude) public {
    placeCount ++;
    places[placeCount] = Place(placeCount, msg.sender, _name, false, _latitude, _longitude);
  }

  function toggleCompleted(uint _id) public {
    Place memory _place = places[_id];
    _place.completed = !_place.completed;
    places[_id] = _place;
  }

  function userCheckIn(uint placeid, string memory _latitude, string memory _longitude) public {
    userCount ++;
    checkins[userCount] = Checkin(placeid, msg.sender, now, _latitude, _longitude);
  } 

}