var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var pagesController = new Controller();
var dbInstance=require('../../config/initializers/mongo__init');
var collection=dbInstance.collection('qi');

pagesController.main = function() {
  this.title = 'Locomotive';
  this.render();
};

pagesController.getAllProductList=function () {
    var __self__=this;
    __self__.result=[];
    __self__.rescounter=0;
    collection.aggregate([
      {
        $group:{
          _id:"$product_id",
          status:{
            $sum:{
              "$multiply" : ["$operation_type", "$quantity"]
            }
          }
        }
      }
    ]).toArray(function (err,response) {
        if(!err){
            response.forEach(function(i){
                res=collection.findOne({ product_id : i._id},function (err,res) {
                    if(!err){
                        resp={
                            product_name:res.product_name,
                            product_id:res.product_id,
                            status:i.status
                        };

                        // res.status=i.status;

                        __self__.result.push(resp);
                        __self__.rescounter++;

                        if(__self__.rescounter==response.length){
                            __self__.res.write(JSON.stringify({
                                status:0,
                                result:__self__.result,
                                totalCount:__self__.result.length
                            }))
                            __self__.res.end();
                        }

                    }else {
                        __self__.rescounter++;
                        console.log(err);
                    }
                })
            })
        }else{
            console.log(err)
        }
    })
};

pagesController.addOrder=function () {
    var __self__=this;
    var obj={
        "8" : "FIX.4.2",
        "35" : 8,
        "39" : 2,
        "44" : 1340,
        "38" : 1000,
        "151" : 0,
        "31" : 1340,
        "11" : 110000072,
        "37" : 1.1e+015,
        "40" : 0,
        "17" : 16673431,
        "6" : 19644600,
        "14" : 0,
        "20" : 0,
        "150" : 2,
        "60" : "20160916-03:47:54",
        "10" : 0
    };

    if(__self__.req.body){

        var product_id=__self__.req.body.selectedProduct.product_id;
        var quantity=__self__.req.body.quantity;
        var operation_type=__self__.req.body.selectedOp;
        var product_name=__self__.req.body.selectedProduct.product_name;

        obj.product_id=product_id;
        obj.quantity=quantity;
        obj.operation_type=parseInt(operation_type);
        obj.product_name=product_name;

        collection.insert(obj,function (err,response) {
            if(!err){
                // console.log(response)
                __self__.res.write(JSON.stringify({
                    status:0,
                    result:"order has been received successfully"
                }));
                __self__.res.end();
            }else {
                __self__.res.write(JSON.stringify({
                    status:404,
                    result:err.toString()
                }));
                __self__.res.end();
            }
        })
    }else {
        __self__.res.write(JSON.stringify({
            status:404,
            result:'invalid request'
        }));
        __self__.res.end();
    }
};

module.exports = pagesController;
