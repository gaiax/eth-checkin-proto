export const PLACE_LIST_ADDRESS = '0x515f55d710871b1751910273175b78a130091b90'

export const PLACE_LIST_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "userCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "checkins",
    "outputs": [
      {
        "name": "placeid",
        "type": "uint256"
      },
      {
        "name": "user",
        "type": "address"
      },
      {
        "name": "checkintime",
        "type": "uint256"
      },
      {
        "name": "latitude",
        "type": "string"
      },
      {
        "name": "longitude",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "placeCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "places",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "completed",
        "type": "bool"
      },
      {
        "name": "latitude",
        "type": "string"
      },
      {
        "name": "longitude",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_latitude",
        "type": "string"
      },
      {
        "name": "_longitude",
        "type": "string"
      }
    ],
    "name": "createPlace",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "toggleCompleted",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "placeid",
        "type": "uint256"
      },
      {
        "name": "_latitude",
        "type": "string"
      },
      {
        "name": "_longitude",
        "type": "string"
      }
    ],
    "name": "userCheckIn",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
