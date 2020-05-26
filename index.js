
const express = require('express');
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

app.use( cors );
app.use( express.static( "public" ) );
app.use(morgan('dev'));

app.post( '/api/users/login', jsonParser, ( req, res ) => {
    let { email, password } = req.body;

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

/*
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
*/

app.listen(PORT, () =>
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

