export const ADDRESS0 = "0x0000000000000000000000000000000000000000";

//tokenを見やすくするために  
export const ether = (n) => {
  return new web3.utils.BN(
    //web３のtoWei()を利用する
    web3.utils.toWei(n.toString(), 'ether')
  )
}  