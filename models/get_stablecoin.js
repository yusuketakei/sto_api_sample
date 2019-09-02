const connect = require('../access_contract/connect.js') ;
const ethers = require('ethers') ;

/** 
 * userIdに該当するwalletからStableCoinの残高を取得する
 * @param {string} userId Node管理者が管理するユーザーID
 * @return {JSON} API response 
 * @todo contractからStable Coinの残高を取得
 */
module.exports.getBalanceOfUser = async function(userId){
    let wallet = await connect.generateWallet(userId) ;
    let contract = await connect.connectContractStableCoin(wallet) ;

    //access contract method
    let balance = ethers.utils.bigNumberify(await contract.functions.balanceOf(wallet.address)).toNumber() ;   

    //generate json
    let returnJson = {
        "userId" : userId ,
        "balance" : balance 
    } ;
    return returnJson ;
}

