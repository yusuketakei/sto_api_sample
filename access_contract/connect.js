const ethers = require('ethers') ;
const config = require('config') ;
const rpcProvider = new ethers.providers.JsonRpcProvider(config.bcEndpoint);

/** 
 * userIdから楕円暗号方式の秘密鍵を入手し当該秘密鍵からwalletオブジェクトを生成
 * @param {string} userId Node管理者が管理するユーザーID
 * @return {object} wallet ethers.wallet
 */
module.exports.generateWallet = async function(userId){

    //userId => PK
    //test PK
    let pk = config["testPkUser"+userId];

    //PK => wallet
    let wallet = new ethers.Wallet(pk,rpcProvider) ;    
    return wallet ;
}
/** 
 * StableCoinコントラクトにアクセスするオブジェクトを生成
 * @param {string} userId Node管理者が管理するユーザーID
 * @return {object} contractWithSigner ethers.contract
 * @todo APIをIPFS化
 * @todo 接続先のContract AddressをContract Naming Serviceから取得する
 */
module.exports.connectContractStableCoin = async function(wallet){
    let contractAddress = config.stableCoinAddress;
    let contractAbi = config.stableCoinAbi ;
    let contract = new ethers.Contract(contractAddress, contractAbi, rpcProvider);
    let contractWithSigner = contract.connect(wallet);

    return contractWithSigner ;
 }