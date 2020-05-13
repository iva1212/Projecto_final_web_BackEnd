var mongoose = require('mongoose');

const UsersCollectionSchema = mongoose.Schema({

    name :{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
    },
    likedgames:[{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'videogames'
    }],
    dislikedgames:[{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'videogames'
    }],
    ratings : [{
        type: mongoose.Schema.Types.ObjectId, ref: 'rating'
    }],
});

const UsersCollection = mongoose.model('users',UsersCollectionSchema);

const Users = {
    createUser : function(newUser){
        return UsersCollection.create(newUser)
        .then ( createdUser =>{
            return createdUser
        })
        .catch(err =>{
            return err;
        });
    },
    getAllUsers: function(){
        return UsersCollection
        .find()
        .then(allUsers =>{
            return allUsers
        })
        .catch(err =>{
            return err;
        });
    },

}

module.exports = {Users};

