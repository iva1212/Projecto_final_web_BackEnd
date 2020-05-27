var mongoose = require('mongoose');

const GenresCollectionSchema = mongoose.Schema({

    name :{
        type: String,
        required : true,
    },
    img_url : {
        type: String,
        required : true,
    },
});

const GenresCollection = mongoose.model('genres',GenresCollectionSchema);

const Genres = {
    createGenre : function(newGenre){
        return GenresCollection.create(newGenre)
        .then ( createdGenre =>{
            return createdGenre
        })
        .catch(err =>{
            return err;
        });
    },
    getAllGenres: function(){
        return GenresCollection
        .find()
        .then(allGenres =>{
            return allGenres
        })
        .catch(err =>{
            return err;
        });
    },
    getGenreByName : function( nameGenre ){
        return GenresCollection
        .findOne({ name : nameGenre })
         .then( genre => {
            if( !genre ){
                throw new Error( "Genre not found" );
            }
             return genre;
            })
            .catch( err => {
                throw new Error( err );
        })
    },
    deleteGenreByName : function( nameObj ){
        GenresCollection
            .deleteOne( { name : nameObj })
            .then( result => {
                return result;
            })
            .catch( err => {
                throw new Error( err.message );
            }); 
    }

}

module.exports = {Genres};