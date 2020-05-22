var mongoose = require('mongoose');

const VideoGamesCollectionSchema = mongoose.Schema({
    title : {
        type: String,
        required : true,
    },
    description : {
        type: String,
        required : true,
    },
    year:{
        type: Number
    },
    img_url : {
        type: String,
        required : true,
    },
    ratings : [{
        type: mongoose.Schema.Types.ObjectId, ref: 'rating'
    }],
    realeseDate : {
        type:String
    },
    consoleId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'consoles'
    },
    developerId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'developers'
    },
    genres:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'genres'
    }]
});

const VideoGamesCollection = mongoose.model('videogames',VideoGamesCollectionSchema);

const VideoGames = {
    createVideoGame : function(newVideoGame){
        return VideoGamesCollection.create(newVideoGame)
        .then ( createdVideoGame =>{
            return createdVideoGame
        })
        .catch(err =>{
            return err;
        });
    },
    getAllVideoGames: function(){
        return VideoGamesCollection
        .find()
        .then(allVideoGames =>{
            return allVideoGames
        })
        .catch(err =>{
            return err;
        });
    },
    getVideoGamerById : function( idGame ){
    return VideoGamesCollection
        .findOne({ _id : idGame })
         .then( game => {
            if( !game ){
                throw new Error( "Game not found" );
            }
             return author;
            })
            .catch( err => {
                throw new Error( err );
        })},

}

module.exports = {VideoGames};