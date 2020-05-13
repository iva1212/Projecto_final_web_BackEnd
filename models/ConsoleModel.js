var mongoose = require('mongoose');

const ConsolesCollectionSchema = mongoose.Schema({
    name :{
        type: String,
        required : true,
    },
    description : {
        type: String,
        required : true,
    },
    img_url : {
        type: String,
        required : true,
    },

});

const ConsolesCollection = mongoose.model('consoles',ConsolesCollectionSchema);

const Consoles = {
    createConsole : function(newConsole){
        return ConsolesCollection.create(newConsole)
        .then ( createdConsole =>{
            return createdConsole
        })
        .catch(err =>{
            return err;
        });
    },
    getAllConsoles: function(){
        return ConsolesCollection
        .find()
        .then(allConsoles =>{
            return allConsoles
        })
        .catch(err =>{
            return err;
        });
    },

}

module.exports = {Consoles};