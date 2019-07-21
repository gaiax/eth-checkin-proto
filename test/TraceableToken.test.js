import { ADDRESS0, ether } from './helpers'

const Token = artifacts.require('./TraceableToken');

//import chai and chai as promised
require('chai')
  .use(require('chai-as-promised'))
  .should() 
 
contract('TraceableToken', ([deployer, user1, user2, user3, user4]) => {
  const name = 'GX Token'
  const symbol = 'GX'
  let tokenId = 0
  let token

  //fetch token contract before each async function
  beforeEach(async () => {
    token = await Token.new()
  })

  describe('deployment', () => {
    it('sample', async () => {
      let result
      let ipfsHash 
      let referencedIds
      let distributionRate
      ipfsHash = "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg"
      referencedIds = []
      distributionRate =[]
      // result = await token.mint(ipfsHash, referencedIds, distributionRate, { from: user1 }) //1
      // result = await token.mint(ipfsHash, referencedIds, distributionRate, { from: user1 }) //2
      // referencedIds = [1,2]
      // distributionRate =[20, 40, 40]
      // result = await token.mint(ipfsHash, referencedIds, distributionRate, { from: user1 })
      //result = await token.hoge(1, distributionRate, { from: user1 })
      //result = await token.distributeRate(1, 1)
      //console.log(result)
      //await token.mint(ipfsHash, referencedIds, { from: user1 })
      //result = await token.RereferencedTokenId(3)
    })

    it ('tracks the name ', async () => {
      //Fetch token contract from blockchain → Read token name → chaeck the token name is "GX Token"
      const result = await token.name()
      result.should.equal(name) 
    })

    it ('track the symbol', async () => {
      const result = await token.symbol()
      result.should.equal(symbol) 
    })
  })

  describe('minting tokens', () => {
    let result
    let ipfsHash 
    let tokenName
    let referencedIds 
    let distributionRate

    beforeEach('mint tokens', async () => {
      ipfsHash = "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg"
      tokenName = "tokenName"
      referencedIds = []
      distributionRate =[]
      result = await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 }) //1
      result = await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user2 }) //2
      referencedIds = [1,2]
      distributionRate =[40, 30, 30]
      result = await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user3 }) //3
      referencedIds = []
      distributionRate =[]
      result = await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 }) //4
      result = await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 }) //5
      result = await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 }) //6
      referencedIds = [4,5,6]
      distributionRate =[10, 30, 30, 30]
      result = await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 }) //7
      referencedIds = [3,7]
      distributionRate =[20, 40, 40]
      result = await token.mint(ipfsHash, tokenName, referencedIds, distributionRate, { from: user1 }) //8
    })

    it('show token name', async () => {
      result = await token.getTokenName(1)
      result.should.equal("tokenName")
      result = await token.getTokenName(2)
      result.should.equal("tokenName")
      result = await token.getTokenName(3)
      result.should.equal("tokenName")
      result = await token.getTokenName(4)
      result.should.equal("tokenName") 
    })

    it('show distrubuted rate', async () => {
      result = await token.distributeRate(3,3)
      result.toString().should.equal("40")
      result = await token.distributeRate(3,1)
      result.toString().should.equal("30")
      result = await token.distributeRate(3,2)
      result.toString().should.equal("30")
    })

    it('facilitates send token', async () => {
      result = await token.sendEther(1, {from: user4, value: ether(10)})
      let log = result.logs[0]
      log.event.should.eq(('TransferEther'))
      // console.log(log)
      let event = log.args
      // const event = await token.events.TransferEther({}, {
      //   fromBlock: 0,
      //   toBlock: 'latest',
      // })
      // console.log(event)
    })

    describe('failure', () => {
      it('munber of referenced token is more than number of distribution rate', async () => {
        ipfsHash = "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg"
        referencedIds = [1, 2, 3]
        distributionRate =[20, 40, 40]
        result = await token.mint(ipfsHash, referencedIds, distributionRate, { from: user1 }).should.be.rejected
      })

      it('munber of referenced token is less than number of distribution rate', async () => {
        ipfsHash = "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg"
        referencedIds = [1, 2]
        distributionRate =[20, 40, 10, 30]
        result = await token.mint(ipfsHash, referencedIds, distributionRate, { from: user1 }).should.be.rejected
      })
      
      it('update metadata is only allawded by token ownwer', async () => {
        referencedIds = [1, 2]
        distributionRate =[20, 20, 60]
        result = await token.updateRereferencedTokenId(3, referencedIds, distributionRate, { from: user2 }).should.be.rejected
      })

      it('sum of distribution rate should be 100 for mint function', async () => {
        ipfsHash = "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg"
        referencedIds = [1, 2, 3]
        distributionRate =[30, 30, 50]
        result = await token.mint(ipfsHash, referencedIds, distributionRate, { from: user1 }).should.be.rejected
        // referencedIds = [1, 2, 3]
        // distributionRate =[30, 30, 50]
        // result = await token.updateRereferencedTokenId(3, referencedIds, distributionRate, { from: user2 }).should.be.rejected
      })

      it('sum of distribution rate should be 100 for update function', async () => {
        ipfsHash = "QmTjzYr14n12YAB4bEMj2fEKcNL3G2TBtBKNxFCRe2Bxtg"
        referencedIds = [1, 2, 3]
        distributionRate =[30, 30, 50]
        result = await token.updateRereferencedTokenId(3, referencedIds, distributionRate, { from: user2 }).should.be.rejected
      })
    })

    it('send ether', async () => {
       
    //   ids.push(8)
    //   let amount1st = amountFor1st * 0.9
    //   amounts.push(amount1st)
    //   result = await token.getRereferencedTokenId(8)
    //   for ( var i = 0;  i < result.length;  i++  ) {
    //     rate = await token.distributeRate(8, result[i])
    //     ids.push(result[i].words[0])
    //     let amountFor2nd = amountFor1st * 0.1 * rate/100
    //     let amount2nd = amountFor2nd * 0.9
    //     amounts.push(amount2nd)
    //     let second = await token.getRereferencedTokenId(result[i])
    //     if (second.length == 0 ) { 
    //       ids.push(result[i].words[0])
    //       amount2nd = amountFor2nd * 0.1
    //       amounts.push(amount2nd)
    //     } else {
    //       for ( var k = 0;  k < second.length;  k++  ) {
    //         ids.push(second[k].words[0])
    //         rate = await token.distributeRate(result[i], second[k])
    //         let amountFor3rd = amountFor2nd * 0.1 * rate/100
    //         let amount3rd = amountFor3rd * 0.9
    //         amounts.push(amount3rd)
    //         let third = await token.getRereferencedTokenId(second[k])
    //         if (third.length == 0 ) {
    //           ids.push(second[k].words[0])
    //           amount3rd = amountFor3rd * 0.1
    //           amounts.push(amount3rd)
    //           console.log(1)
    //         } else {

    //         }
    //       }            
    //     }
    //   }
    //   console.log(ids)
    //   console.log(amounts)
    //   for (var j=0; j < ids.length; j++) {
    //     //result = await token.smaple(ids[j])
    //     result = await token.sendEther(ids[j], {from: user2, value: amounts[j]}) 
    //   }
    })
    
  })
})