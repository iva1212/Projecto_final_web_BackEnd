
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const morgan = require( 'morgan' );
const bodyParcer = require('body-parser');
const bcrypt = require( 'bcryptjs' );
const jsonwebtoken = require( 'jsonwebtoken' );
const validator = require('./middleware/validateToken');
const {VideoGames} = require('./models/VideoGameModel');
const {Genres} = require('./models/GenreModel');
const {Consoles} = require('./models/ConsoleModel');
const {Developers} = require('./models/DeveloperModel');
const {Users} = require('./models/UsersModel');
const {Ratings} = require('./models/RatingsModel');
const {DATABASE_URL, PORT, SECRET_TOKEN} = require( './config' );
const cors = require( './middleware/cors' );
const app = express();
const jsonParser = bodyParcer.json();
const mongoose = require( 'mongoose' );
const assert = require('assert') 
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

app.use( cors );
app.use(morgan('dev'));
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/database', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/profile', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/games/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/signUp', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.post( '/api/users/login', jsonParser, ( req, res ) => {
    let { email, password } = req.body;

    console.log(email)
    console.log(password)
    if(!email || !password ){
        res.statusMessage = "Parameter missing in the body of the request.";
        return res.status( 406 ).end();
    }

    Users
        .getUserByEmail( email )
        .then( user => {
            bcrypt.compare( password, user.password )
                .then( result => {
                    if( result ){

                        let userData = {
                            name : user.name,
                            last_name : user.last_name,
                            type:user.type,
                            email : user.email
                        };

                        jsonwebtoken.sign( userData, SECRET_TOKEN, {expiresIn : '30m'}, ( err, token ) => {
                            if( err ){
                                res.statusMessage = err.message;
                                return res.status( 400 ).end();
                            }
                            return res.status( 200 ).json( { token } );
                        });
                    }
                    else{
                        res.statusMessage = "Wrong credentials.";
                        return res.status( 409 ).end();
                    }
                })
                .catch( err => {
                    res.statusMessage = err.message;
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

app.get('/api/games',(req,res)=>{
    VideoGames.getAllVideoGames()
    .then(allVideoGames =>{
        return res.status(200).json(allVideoGames);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});

app.get('/api/games/:id',(req,res)=>{
    let id = req.params.id;
    if( !id ){
        res.statusMessage = "Please send the 'id'";
        return res.status( 406 ).end();
    }
    VideoGames.getVideoGameById(id)
    .then(VideoGame =>{
        return res.status(200).json(VideoGame);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});

app.post('/api/games',jsonParser,(req,res)=>{
    console.log( "Body ", req.body );

    let title = req.body.title;
    let description = req.body.description;
    let year = req.body.year;
    let img_url = req.body.img_url;
    let consoles = req.body.consoles;
    let developerId = req.body.developerId;
    let genres = req.body.genres;
    if( !title || !description || !img_url){
        res.statusMessage = "One parameter is missing";

        return res.status( 406 ).end();
    }
    let newVideoGame = { title,description,year,img_url,consoles,developerId,genres};
    VideoGames
    .createVideoGame(newVideoGame)
    .then(result =>{
        return res.status(201).json(result);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});



app.get('/api/consoles',(req,res)=>{
    Consoles.getAllConsoles()
    .then(allConsoles =>{
        return res.status(200).json(allConsoles);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});

app.post('/api/consoles',jsonParser,(req,res)=>{
    console.log( "Body ", req.body );

    let name = req.body.name;
    let description = req.body.description;
    let img_url = req.body.img_url;
    if( !name || !description || !img_url){
        res.statusMessage = "One parameter is missing";
        return res.status( 406 ).end();
    }
    
    let newConsole = { name,description,img_url};
    Consoles
    .createConsole(newConsole)
    .then(result =>{
        return res.status(201).json(result);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});
app.get('/api/developers',(req,res)=>{
    Developers.getAllDevelopers()
    .then(getAllDevelopers =>{
        return res.status(200).json(getAllDevelopers);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});

app.post('/api/developers',jsonParser,(req,res)=>{
    console.log( "Body ", req.body );

    let name = req.body.name;
    let country = req.body.country;
    let img_url = req.body.img_url;
    if( !name || !country || !img_url){
        res.statusMessage = "One parameter is missing";
        return res.status( 406 ).end();
    }
    
    let newDeveloper = { name,country,img_url};
    Developers
    .createDeveloper(newDeveloper)
    .then(result =>{
        return res.status(201).json(result);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});

app.get('/api/genres',(req,res)=>{
    Genres.getAllGenres()
    .then(getAllGenres =>{
        return res.status(200).json(getAllGenres);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});

app.post('/api/genres',jsonParser,(req,res)=>{
    console.log( "Body ", req.body );

    let name = req.body.name;
    let img_url = req.body.img_url;
    if( !name  || !img_url){
        res.statusMessage = "One parameter is missing";
        return res.status( 406 ).end();
    }
    
    let newGenre = { name,img_url};
    Genres
    .createGenre(newGenre)
    .then(result =>{
        return res.status(201).json(result);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});

app.post('/api/rating',jsonParser,(req,res)=>{
    let email = req.body.email;
    let gameId = req.body.game_Id;
    let stars = req.body.stars;
    let review = req.body.review;

    let author_name;
    Users.getUserByEmail(email)
    .then((user) => {
        author_name = user.name + " "+ user.last_name;
        console.log(author_name);
        if(author_name){
            let newRating={stars,review,author_name}
            Ratings.createRating(newRating)
            .then((raiting)=>{
                 VideoGames.getVideoGameById(gameId)
                 .then((game)=> {
                    console.log(game.title)
                    console.log(user.name)

                    game.ratings.push(raiting._id);
                    user.ratings.push(raiting._id);
                    var promiseG = game.save();
                    assert.ok(promiseG instanceof Promise);
                    promiseG.then((game)=>{
                        var promiseU = user.save();
                        assert.ok(promiseU instanceof Promise);
                        promiseU.then((user)=>{
                            return res.status( 200 ).end();
                        })
                    })

                     })
                     .catch((err)=> {
                         console.log(err)
                         return res.status( 406 ).end();
                        });
                
            })
        }
        else{
            return res.status( 406 ).end();
        }
    })
    .catch((err)=> {
        console.log(err)
        return res.status( 406 ).end();
    });
    

});
app.get('/api/ratingsByUser/:userEmail',(req,res)=>{
    const { userEmail } = req.params;
    console.log(userEmail)
    Users.getUserByEmail(userEmail)
    .then(user =>{
        console.log(user);
        Ratings.getRaitingsByIds(user.ratings)
        .then(raitings=>{
            return res.status(200).json(raitings);
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).end();})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).end();
    })
});
app.get('/api/ratingsByGame/:gameId', (req,res) =>{
    const { gameId } = req.params;
    VideoGames.getVideoGameById(gameId)
    .then(game=>{
        Ratings.getRaitingsByIds(game.ratings)
        .then(raitings=>{
            return res.status(200).json(raitings);
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).end();})
        
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).end();})
});

app.get('/api/users',(req,res)=>{
    Users.getAllUsers()
    .then(getAllUsers =>{
        return res.status(200).json(getAllUsers);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});

app.post('/api/users',jsonParser,(req,res)=>{
    console.log( "Body ", req.body );

    let name = req.body.name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
    if( !name  || !email || !password || !last_name){
        res.statusMessage = "One parameter is missing";
        return res.status( 406 ).end();
    }

    bcrypt.hash(password, 10)
        .then( hashedPassword => {
            let newUser = {
                name,
                last_name,
                type: "normal",
                password : hashedPassword,
                email
            };

            Users
                .createUser( newUser )
                .then(result => {
                    return res.status(201).json( result );
                })
                .catch(err => {
                    res.statusMessage = "Something went wrong with the DB,Try again Later.";
                    return res.status(500).end();
                })
        })
        .catch( err => {
            res.statusMessage = err.message;
            return res.status( 400 ).end();
        });
});

app.get('/api/videogamesByGenre/:nameGenre', ( req,res ) => {
    const { nameGenre } = req.params;

    Genres
        .getGenreByName( nameGenre )
        .then( genres => {
            const genreObjectName = genres.name;

            VideoGames
                .getVideoGamesByGenre( genreObjectName )
                .then( videogames => {
                    return res.status( 200 ).json( videogames );
                })
                .catch( err => {
                    res.statusMessage = "Something went wrong when retrieving the genres.";
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status( 400 ).end(); 
        });
});

app.get('/api/videogamesByDeveloper/:nameDeveloper', ( req,res ) => {
    const { nameDeveloper } = req.params;

    Developers
        .getDeveloperByName( nameDeveloper )
        .then( developers => {
            const developerObjectName = developers.name;

            VideoGames
                .getVideoGamesByDeveloper( developerObjectName )
                .then( videogames => {
                    return res.status( 200 ).json( videogames );
                })
                .catch( err => {
                    res.statusMessage = "Something went wrong when retrieving the developers.";
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status( 400 ).end(); 
        });
});

app.get('/api/videogamesByConsole/:nameConsole', ( req,res ) => {
    const { nameConsole } = req.params;

    Consoles
        .getConsoleByName( nameConsole )
        .then( console => {
            const consoleObjectName = console.name;

            VideoGames
                .getVideoGamesByConsole( consoleObjectName )
                .then( videogames => {
                    return res.status( 200 ).json( videogames );
                })
                .catch( err => {
                    res.statusMessage = "Something went wrong when retrieving the VideoGames.";
                    return res.status( 400 ).end();
                });
        })
        .catch( err => {
            res.statusMessage = `Something went wrong: ${err.message}.`;
            return res.status( 400 ).end(); 
        });
});

app.get('/api/videoGamesByTitle/:titleGame', (req,res)=>{
    const { titleGame } = req.params;
    console.log(titleGame);
    VideoGames
        .getVideoGamesByTitle( titleGame )
        .then( videogames =>{
            return res.status(200).json( videogames );
        })
        .catch(err =>{
            res.statusMessage = "Something went wrong with the DB,Try again Later.";
            return res.status(500).end();
        })
});

app.delete( '/api/removeUser',jsonParser, ( req, res ) => {
    let name = req.body.name;

    if( !name ){
        res.statusMessage = "Please send the 'name' to delete a User";
        return res.status( 406 ).end();
    }

    Users.deleteUserByName( name );

    return res.status( 200 ).end();
});

app.delete( '/api/removeVideoGame',jsonParser, ( req, res ) => {
    let title = req.body.title;

    if( !title ){
        res.statusMessage = "Please send the 'title' to delete a videoGame";
        return res.status( 406 ).end();
    }

    VideoGames.deleteVideoGameByTitle( title );

    return res.status( 200 ).end();
});

app.delete( '/api/removeDeveloper',jsonParser, ( req, res ) => {
    let name = req.body.name;

    if( !name ){
        res.statusMessage = "Please send the 'name' to delete a Developer";
        return res.status( 406 ).end();
    }

    Developers.deleteDeveloperByName( name );

    return res.status( 200 ).end();
});

app.delete( '/api/removeConsole',jsonParser, ( req, res ) => {
    let name = req.body.name;

    if( !name ){
        res.statusMessage = "Please send the 'name' to delete a Console";
        return res.status( 406 ).end();
    }

    Consoles.deleteConsoleByName( name );

    return res.status( 200 ).end();
});

app.delete( '/api/removeGenre',jsonParser, ( req, res ) => {
    let name = req.body.name;

    if( !name ){
        res.statusMessage = "Please send the 'name' to delete a genre";
        return res.status( 406 ).end();
    }

    Genres.deleteGenreByName( name );

    return res.status( 200 ).end();
});

app.post( '/api/likeGame', jsonParser, ( req, res ) => {
    let email = req.body.email;
    let id = req.body.id;

    VideoGames
        .getVideoGameById( id )
        .then( game => {
            Users
                .getUserByEmail( email )
                .then( user => {
                    user.likedgames.push(game._id)
                    console.log(user);
                    var promiseU = user.save();
                    assert.ok(promiseU instanceof Promise);
                    promiseU.then( user =>{
                        return res.status( 200 ).end();
                    })
                })
                .catch((err)=> {
                    console.log(err)
                    return res.status( 406 ).end();
                });
        })
        .catch((err)=> {
            console.log(err)
            return res.status( 406 ).end();
        });
});

app.get( '/api/likeGame/:userEmail',jsonParser,  ( req, res ) => {
    const { userEmail } = req.params;
    Users.getUserByEmail(userEmail)
    .then(user =>{
        VideoGames.getVideoGamesByIdList(user.likedgames)
            .then(games=>{
                return res.status(200).json(games);
            })
            .catch((err)=> {
                console.log(err)
                return res.status( 406 ).end();
            });
    })
    .catch((err)=> {
        console.log(err)
        return res.status( 406 ).end();
    });

});

app.delete( '/api/deleteLikedGame', jsonParser, ( req, res ) => {
    let email = req.body.email;
    let id = req.body.id;

    Users.getUserByEmail(email)
        .then(user =>{
            if(user.likedgames.includes(id)){
                for( i = 0; i < user.likedgames.length; i++ ){
                    if(id == user.likedgames[i]){
                        user.likedgames.splice(i, 1);
                        var promiseU = user.save();
                        assert.ok(promiseU instanceof Promise);
                        promiseU.then(( user )=>{
                            return res.status( 200 ).end();
                        })
                    }
                }
            }
            else{
                return res.status(404).end()
            }
        })
        .catch((err)=> {
            console.log(err)
            return res.status( 406 ).end();
        });  
})

app.post( '/api/isLiked',jsonParser,  ( req, res ) => {
    let email = req.body.email;
    let id = req.body.id;
    Users.getUserByEmail(email)
    .then(user =>{
        if(user.likedgames.includes(id))
            return res.status(200).end()
        else
            return res.status(404).end()
    })
    .catch((err)=> {
        console.log(err)
        return res.status( 406 ).end();
    });

});

/*app.get( '/api/recommendedGames', jsonParser, ( req, res ) => {
    let email = req.body.email;
    let genre = [];

    Users
        .getUserByEmail( email )
        .then( user => {
            console.log(user.name);
            VideoGames
                .getVideoGamesByIdList( user.likedgames[0] )
                .then( vgames => {
                    console.log(vgames);
                    VideoGames
                        .getVideoGamesByGenre( vgames[0].genres )
                        .then( games => {
                            console.log(games);
                            return res.status(200).json(games).end();
                        })
                })
                .catch((err)=> {
                    console.log(err)
                    return res.status( 406 ).end();
                });
            })
            .catch((err)=> {
                console.log(err)
                return res.status( 406 ).end();
            });
});*/

app.get( '/api/recommendedGames/:userEmail', jsonParser, ( req, res ) => {
    const {userEmail} = req.params;
    let g = [];

    Users
        .getUserByEmail( userEmail)
        .then( user => {
            VideoGames
                .getVideoGamesByIdList( user.likedgames )
                .then( vgames => {
                    var genres = Array.from(vgames,game=>game.genres)
                    var flattened = [].concat.apply([],genres);
                    let unique = [...new Set(flattened)];
                    VideoGames.getVideoGamesByGenreList(unique)
                    .then(games=>{
                        
                        var result = games.filter(item => !vgames.some(other => item.title === other.title));
                        shuffle(result)
                        console.log(result)
                        return res.status(200).json(result).end();
                    })
                    .catch((err)=> {
                        console.log(err)
                        return res.status( 406 ).end();
                    });
                })
                .catch((err)=> {
                    console.log(err)
                    return res.status( 406 ).end();
                });
            })
            .catch((err)=> {
                console.log(err)
                return res.status( 406 ).end();
            });

        //return res.status(200).end();
});

app.listen(PORT,() =>
{
    new Promise( (resolve,reject) =>{

        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };

        mongoose.connect(DATABASE_URL,settings,(err) =>{
            if (err){
                reject(err);
            }
            else{
                console.log("Database connected");
                return resolve();
            }
        });
    })
    .catch(err =>{
        mongoose.disconnect();
        console.log(err);
    })
    console.log("This server is using port "+PORT);
});