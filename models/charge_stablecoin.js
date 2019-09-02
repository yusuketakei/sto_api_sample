const connect = require('../access_contract/connect.js') ;

/** 
 * userIdに該当するwalletにStableCoinをチャージする
 * @param {string} userId charge対象のユーザーID
 * @param {int} amount charge額
 * @return {JSON} API response 
 * @todo stable coin発行側のPrivate Key保管方法
 */
module.exports.charge = async function(userId,amount){
    //charge先のユーザーwallet
    let toWallet = await connect.generateWallet(userId) ;
    //charge元のユーザーwallet
    const fromUserId = 0
    let fromWallet = await connect.generateWallet(fromUserId)
    let contract = await connect.connectContractStableCoin(fromWallet) ;

    //access contract method
    let txResult = await contract.functions.mint(toWallet.address,amount) ;   
    let receipt = await fromWallet.provider.waitForTransaction(txResult.hash) ;
    console.log(receipt) ;

    //generate json
    let returnJson = {
        "userId" : userId,
        "amount" : amount 
    } ;
    return returnJson ;
}

