import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum)
    console.log(1)
    window.ethereum.enable().catch(error => {
        // User denied account access
        console.log(error)
    })
} else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {　// ②
    web3 = new Web3(window.web3.currentProvider)
    console.log(2)
} else { 
    const httpEndpoint = 'https://ropsten.infura.io/v3/e798d80d2ee749e1aa6474767d94a445'
    const provider = new Web3.providers.HttpProvider(httpEndpoint)
    web3 = new Web3(provider)
    console.log(3)
}

export default web3
