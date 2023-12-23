module.exports = function(err,req,res,next){
    // Log Error message
    res.status(500).send("Something went wrong.");
}