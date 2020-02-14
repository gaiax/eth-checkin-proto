# checkin-app
Checkin application using Ethereum

## Web demosite
https://eth-checkin.firebaseapp.com

## Contributing
Pull requests and stars are always welcome.

1. Fork it!
2. Create your feature branch.
```
git checkout -b my-new-feature.
``` 
3. Commit your changes
```
git commit -am 'Add some feature.
``` 
4. Push to the branch.
```
git push origin my-new-feature
``` 
5. Submit a pull request 
For bugs and feature requests, [create an issue](https://github.com/gaiax/eth-checkin-proto/issues).


## Developer's guide

### Installation

```bash
$ git clone git@github.com:gaiax/eth-checkin-proto.git
$ cd eth-checkin-proto

# Install Truffle dependencies
$ npm i

# Install frontend dependencies
$ cd frontend
$ npm i
```

### build local blockchain and deploy

1. Install Ganache. (https://www.trufflesuite.com/ganache)
2. Launch Ganache
3. Deploy contracts to local blockchain
```bash
$ truffle compile
$ truffle migrare --reset
```

### Run

```bash
# launch web view
$ cd frontend
$ npm start
```

