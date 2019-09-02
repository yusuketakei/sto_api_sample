const ApiError = require("../errors/ApiError.js") ;
const getStableCoin = require("../models/get_stablecoin.js") ;
const chargeStableCoin = require("../models/charge_stablecoin.js") ;
module.exports = function(express) {
    var router = express.Router() ;
    
    router.get('/stablecoin/:userId', async (req, res,next) => {
        try{
            let userId = req.params.userId ;
            if(!userId){
                next(new ApiError("user id is required",403)) ;
            }
            let resJson = await getStableCoin.getBalanceOfUser(userId) ;
            res.json(resJson) ;
        }catch(e){
            next(e) ;
        }
    }) ;

    router.post('/stablecoin/:userId/charge', async (req, res,next) => {
        try{
            let userId = req.params.userId ;
            if(!userId){
                next(new ApiError("user id is required",403)) ;
            }
            let amount = req.body.amount ;
            let resJson = await chargeStableCoin.charge(userId,amount)
            res.json(resJson) ;
        }catch(e){
            next(e) ;
        }
    }) ;

    return router ;

}