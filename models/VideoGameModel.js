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
    consoles: [{
        type: String
    }],
    developerId:{
        type:String
    },
    genres:[{
        type: String
    }],
});

const VideoGamesCollection = mongoose.model('videogames',VideoGamesCollectionSchema);

VideoGamesCollectionSchema.index({title: "text"});
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
    getVideoGameById : function( idGame ){
    return VideoGamesCollection
        .findOne({ _id : idGame })
         .then( game => {
            if( !game ){
                throw new Error( "Game not found" );
            }
             return game;
            })
            .catch( err => {
                throw new Error( err );
        })
    },
    getVideoGamesByGenre : function( genreObjectName ){
        return VideoGamesCollection
            .find({ genres : genreObjectName })
            .then( allVideoGames => {
                return allVideoGames;
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    getVideoGamesByDeveloper : function( developerObjectName ){
        return VideoGamesCollection
            .find({developer : developerObjectName })
            .then( allVideoGames => {
                return allVideoGames;
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    getVideoGamesByConsole : function( consoleObjectName ){
        return VideoGamesCollection
            .find({ consoles : consoleObjectName })
            .then( allVideoGames => {
                return allVideoGames;
            })
            .catch( err => {
                throw new Error( err );
            });
    },
    getVideoGamesByTitle : function( titleGame ){
        return VideoGamesCollection
            .find({ title: { $regex: titleGame, $options: 'i'}})
             .then( games => {
                 console.log(games);
                    return games;
                })
                .catch( err => {
                    console.log(err)
                    throw new Error( err );
            })
        },
        deleteVideoGameByTitle : function( titleObj ){
            VideoGamesCollection
                .deleteOne( { title : titleObj })
                .then( result => {
                    return result;
                })
                .catch( err => {
                    throw new Error( err.message );
                }); 
        },
        getVideoGamesByGenre : function( genreGame ){
            return VideoGamesCollection
                .find({ genres : genreGame })
                 .then( games => {
                        return games;
                    })
                    .catch( err => {
                        console.log(err)
                        throw new Error( err );
                })
            },
}

module.exports = {VideoGames};