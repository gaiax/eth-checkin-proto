
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
      return placeListInstance.getAdmin(user1)
      return placeListInstance.getAdmin(admin);
    }).then(function(address) {
      adminFromContract = address;
      assert.equal(adminFromContract, admin);
    });
  })
  
  it('facilitates create user function', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.createUser("Sample1", {from: user1});
    }).then(function(receipt) {
      console.log(receipt)
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'CreateUser', 'should be the "CreateUser" event');
      assert.equal(receipt.logs[0].args.userName, "Sample1", 'logs the user name');
      assert.equal(receipt.logs[0].args.userAddress, user1, 'logs the user address');
      return placeListInstance.users(user1)
    }).then(function(result) {
      user = result
      assert.equal(user.userName, "Sample1" , 'Smample1 is the name of User1')
      assert.equal(user.userAddress, user1, 'Address should be same as user1')
    })
  })

  it('facilitates create place function', function() {
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
    })
  })

  it('facilitates check-in function', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.userCheckIn(1, "35.737950000000005", "139.7400068", {from: user1})
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, placeCount - 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'CheckIn', 'should be the "CheckIn" event');
      assert.equal(receipt.logs[0].args._placeid, placeCount - 1, 'logs the place id');
      assert.equal(receipt.logs[0].args._user, user1, 'logs the the account the user who checked-in');
      //assert.equal(receipt.logs[0].args._checkintime, now, 'logs the time when user checked-in');
      assert.equal(receipt.logs[0].args._latitude, "35.737950000000005", 'logs the latitude');
      assert.equal(receipt.logs[0].args._longitude, "139.7400068", 'logs the longitude');
      return placeListInstance.userCheckIn(1, "35.737950000000005", "139.7400068", {from: user2})
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, placeCount - 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'CheckIn', 'should be the "CheckIn" event');
      assert.equal(receipt.logs[0].args._placeid, placeCount - 1, 'logs the place id');
      assert.equal(receipt.logs[0].args._user, user2, 'logs the the account the user who checked-in');
      //assert.equal(receipt.logs[0].args._checkintime, now, 'logs the time when user checked-in');
      assert.equal(receipt.logs[0].args._latitude, "35.737950000000005", 'logs the latitude');
      assert.equal(receipt.logs[0].args._longitude, "139.7400068", 'logs the longitude');
    })  
  })

  it('facilitates getCheckinListForUser function', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.getCheckinListForUser(0, user1);
    }).then(function(result) {
      checkinListForUser = result;
      assert.equal(checkinListForUser.placeid, 1, 'show an place id of filtered check-in list for user');
      assert.equal(checkinListForUser.user, user1, 'show an address of filtered check-in list for user');
    })
  })

  it('facilitates getCheckinListForOwner function', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.getCheckinListForOwner(0, 1);
    }).then(function(result) {
      checkinListForOwner = result;
      assert.equal(checkinListForOwner.user, user1, 'show a user address of filtered check-in list for owner');
      return placeListInstance.getCheckinListForOwner(1, 1);
    }).then(function(result) {
      checkinListForOwner = result;
      assert.equal(checkinListForOwner.user, user2, 'show a user address of filtered check-in list for owner');
    })
  })

  it('facilitates getAllCheckinList function', function() {
    return PlaceList.deployed().then(function(instance) {
      placeListInstance = instance;
      return placeListInstance.getAllCheckinList(0, placeOwner);
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'cannot access to getAllCheckinList function');
      return placeListInstance.getAllCheckinList(0, admin);
    }).then(function(result) {
      allCheckinList = result;
      assert.equal(allCheckinList.user, user1);
      return placeListInstance.getAllCheckinList(1, admin);
    }).then(function(result) {
      allCheckinList = result;
      assert.equal(allCheckinList.user, user2);
    })
  })

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
