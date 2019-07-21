const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//Contracts
const TraceableToken = artifacts.require("./TraceableToken.sol");

module.exports = async function(callback) {
  try {
    //Fetch accounts from wallet -- those are unlocked
    const accounts = await web3.eth.getAccounts()

    //Fetch the deployed contract
    const token = await TraceableToken.deployed()
    console.log(`Token fetched`, token.address)

    //Give tokens to account[1]
    //const user1 = accounts[1]
    const user1 = "0xb4Ee570738Eb8894D444105c9F8F8Fb0a57af531" //for testnet
    const user2 = accounts[2]
    const user3 = accounts[3]
    const user4 = accounts[4]
    const user5 = accounts[5]
    const user6 = accounts[6]
    const user7 = accounts[7]
    const user8 = accounts[8] 
    let ipfsHash
    let tokenName
    let referencedIds
    let distributionRate
    console.log(user1)

    //create 1st erc721 token
    ipfsHash = "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg"
    tokenName = "Grand Canyon"
    referencedIds = []
    distributionRate =[]
    await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 })
    //await token.setTokenURI(1, ipfsHash, { from: user1 })
    //await token.setRereferencedTokenId(1, referencedIds, { from: user1 })
    console.log(`Created token1 from ${user1}`)
    await wait(1)

    //create 2nd erc721 token
    ipfsHash = "QmY8qBXGaGjK57uqfyyMuc8ToLe55Znyu2YEdjiHKi92jR"
    tokenName = "SEIYU"
    await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 })
    //await token.setTokenURI(2, ipfsHash, { from: user2 })
    //await token.setRereferencedTokenId(1, referencedIds, { from: user2 })
    console.log(`Created token2 from ${user1}`)
    await wait(1)

    //create 3rd erc721 token
    ipfsHash = "QmfVwDBXLEanRqu21kswSFnQoeQzsxUekjCUdvEBbatFrH"
    tokenName = "User Icon"
    referencedIds = [1,2]
    distributionRate =[40, 30, 30]
    await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 })
    //await token.setTokenURI(3, ipfsHash, { from: user1 })
    //await token.setRereferencedTokenId(1, referencedIds, { from: user1 })
    console.log(`Created token3 from ${user1}`)
    await wait(1)

    //create 4th erc721 token(4)
    ipfsHash = "QmZoyPkfkLwfqsiHgYcTykhPCPgkWCRHaFHU5ATu79SFgZ" //pdf file
    tokenName = "読書会 要約（PDF）"
    referencedIds = []
    distributionRate =[]
    await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 })
    console.log(`Created token4 from ${user1}`)
    await wait(1)

    //create 5th erc721 token(5)
    ipfsHash = "QmZoyPkfkLwfqsiHgYcTykhPCPgkWCRHaFHU5ATu79SFgZ" //同じPDF.fileはHash値？は同じ（前は開かなかった）
    tokenName = "読書会 要約（PDF）- copy"
    referencedIds = []
    distributionRate =[]
    await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 })
    console.log(`Created token5 from ${user1}`)
    await wait(1)

    //create 6th erc721 token(6)
    ipfsHash = "QmQfXiRQBve14Psy4Lnt2FCyK6JTH3uTBCa9Gxqp1bWAn5" // 音声データ
    tokenName = "音声データ"
    referencedIds = []
    distributionRate =[]
    await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 })
    console.log(`Created token6 from ${user1}`)
    await wait(1)

    //create 7th erc721 token(7)
    ipfsHash = "QmfVwDBXLEanRqu21kswSFnQoeQzsxUekjCUdvEBbatFrH" //動画データ
    tokenName = "動画（扇風機）"
    referencedIds = [4,5,6]
    distributionRate = [10, 30, 30, 30]
    await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 })
    console.log(`Created token7 from ${user1}`)
    await wait(1)

    //create 8th erc721 token(7)
    ipfsHash = "QmfVwDBXLEanRqu21kswSFnQoeQzsxUekjCUdvEBbatFrH" //動画データ
    tokenName = "動画（扇風機）-2"
    referencedIds = [3,7]
    distributionRate =[10, 45, 45]
    await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 })
    console.log(`Created token8 from ${user1}`)
    await wait(1)

  } catch(error) {
    console.log(error)
  }

  callback()
} 