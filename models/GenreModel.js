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

}

module.exports = {Genres};