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
    getConsoleByName : function( nameConsole ){
        return ConsolesCollection
        .findOne({ name : nameConsole })
         .then( console => {
            if( !console ){
                throw new Error( "Console not found" );
            }
             return console;
            })
            .catch( err => {
                throw new Error( err );
        })
    },
    deleteConsoleByName : function( nameObj ){
        ConsolesCollection
            .deleteOne( { name : nameObj })
            .then( result => {
                return result;
            })
            .catch( err => {
                throw new Error( err.message );
            }); 
    }
}

module.exports = {Consoles};