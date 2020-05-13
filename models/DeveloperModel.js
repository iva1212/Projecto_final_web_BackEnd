var mongoose = require('mongoose');

const DevelopersCollectionSchema = mongoose.Schema({

    name :{
        type: String,
        required : true,
    },
    country:{
        type: String,
        required : true,
    },
    img_url : {
        type: String,
        required : true,
    },

});

const DevelopersCollection = mongoose.model('developers',DevelopersCollectionSchema);

const Developers = {
    createDeveloper : function(newDeveloper){
        return DevelopersCollection.create(newDeveloper)
        .then ( createdDeveloper =>{
            return createdDeveloper
        })
        .catch(err =>{
            return err;
        });
    },
    getAllDevelopers: function(){
        return DevelopersCollection
        .find()
        .then(allDevelopers =>{
            return allDevelopers
        })
        .catch(err =>{
            return err;
        });
    },

}

module.exports = {Developers};