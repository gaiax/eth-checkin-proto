var PlaceList = artifacts.require('./PlaceList.sol');

contract('PlaceList', function(accounts) {
  var placeListInstance;
  var admin = accounts[0];
  var placeOwner = accounts[1]; 
  var user1 = accounts[2];
  var user2 = accounts[3];

  it('initialize the contract with the correct values', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.address
    }).then(function(address) {
      assert.notEqual(address, 0x0, 'has contract address');
    });
  });

  it('facilitates admin is secured', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.getAdmin(admin);
    }).then(function(address) {
      adminFromContract = address;
      assert.equal(adminFromContract, admin);
    });
  })

  it('facilitates create place and check-in', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.placeCount()
    }).then(function(p) {
      placeCount = p + 1;
      assert.equal(placeCount, 1);  
      return placeListInstance.createPlace("MyPlace", "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg", "35.737950000000005", "139.7400068", {from: placeOwner});
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'CreatePlace', 'should be the "CreatePlace" event');
      assert.equal(receipt.logs[0].args._id, placeCount++, 'logs the place id');
      assert.equal(receipt.logs[0].args._owner, placeOwner, 'logs the account that the owner of place');
      assert.equal(receipt.logs[0].args._name, "MyPlace", 'logs the name of place');
      assert.equal(receipt.logs[0].args._ipfsHash, "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg", 'logs the ipfsHash')
      assert.equal(receipt.logs[0].args._latitude, "35.737950000000005", 'logs the latitude')
      assert.equal(receipt.logs[0].args._longitude, "139.7400068", 'logs the longitude')
      return placeListInstance.userCheckIn(1, "35.737950000000005", "139.7400068", {from: user1})
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, placeCount - 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'CheckIn', 'should be the "CheckIn" event');
      assert.equal(receipt.logs[0].args._placeid, placeCount - 1, 'logs the place id');
      assert.equal(receipt.logs[0].args._user, user1, 'logs the the account the user who checked-in');
      //assert.equal(receipt.logs[0].args._checkintime, now, 'logs the time when user checked-in');
      assert.equal(receipt.logs[0].args._latitude, "35.737950000000005", 'logs the latitude');
      assert.equal(receipt.logs[0].args._longitude, "139.7400068", 'logs the longitude');
      return placeListInstance.getNumberOfVisiters(1)
    }).then(function(number) {
      numberOfVisiters = number
      assert.equal(numberOfVisiters, 1, 'show the number of visiter for specific place');
      return placeListInstance.userCheckIn(1, "35.737950000000005", "139.7400068", {from: user2})
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, placeCount - 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'CheckIn', 'should be the "CheckIn" event');
      assert.equal(receipt.logs[0].args._placeid, placeCount - 1, 'logs the place id');
      assert.equal(receipt.logs[0].args._user, user2, 'logs the the account the user who checked-in');
      //assert.equal(receipt.logs[0].args._checkintime, now, 'logs the time when user checked-in');
      assert.equal(receipt.logs[0].args._latitude, "35.737950000000005", 'logs the latitude');
      assert.equal(receipt.logs[0].args._longitude, "139.7400068", 'logs the longitude');
      return placeListInstance.getNumberOfVisiters(1)
    }).then(function(number) {
      numberOfVisiters = number
      assert.equal(numberOfVisiters, 2, 'show the number of visiter for specific place');
      return placeListInstance.getNumberOfCheckin()
    }).then(function(number) {
      numberOfCheckin = number;
      assert.equal(numberOfCheckin, 2, 'show the number of check-in');
      return placeListInstance.getNumberOfPlace()
    }).then(function(number) {
      numberOfPlace = number
      assert.equal(numberOfPlace, 1, 'show the number of place');
      return placeListInstance.getCheckinListForUser(0, user1);
    }).then(function(result) {
      checkinListForUser = result;
      assert.equal(checkinListForUser[0]._placeid, 1), 'place id of filtered check-in list for user';
    })
  });

  it('facilitates number of place and check-in', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.getNumberOfCheckin()
    }).then(function(number) {
      numberOfCheckin = number;
      assert.equal(numberOfCheckin, 2);
    })
  })

  it('facilitates number of place and check-in', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.hogehoge()
    }).then(function(result) {
      hoges = result;
      assert.equal(hoges.id, 1);
    })
  })
})
