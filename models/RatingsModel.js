var mongoose = require('mongoose');

const RatingsCollectionSchema = mongoose.Schema({

    stars:{
        type:Number,
        required : true,
    },
    review:{
        type:String,
        required : true,
    },
    author_name:{
        type:String,
        required : true,
    }
});

const RatingsCollection = mongoose.model('ratings',RatingsCollectionSchema);

const Ratings = {
    createRating : function(newRating){
        return RatingsCollection.create(newRating)
        .then ( createdRating =>{
            return createdRating
        })
        .catch(err =>{
            return err;
        });
    },
    getAllRatings: function(){
        return RatingsCollection
        .find()
        .then(allRatings =>{
            return allRatings
        })
        .catch(err =>{
            return err;
        });
    },
    getRaitingsByIds: function(idList){
        return RatingsCollection
        .find({_id:{'$in': idList}})
        .then(allRatings =>{
            return allRatings
        })
        .catch(err =>{
            return err;
        });
    },

}

module.exports = {Ratings};