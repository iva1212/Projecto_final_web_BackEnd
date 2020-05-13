
const express = require('express');
const morgan = require( 'morgan' );
const bodyParcer = require('body-parser');
const validator = require('./middleware/validateToken');
const {VideoGames} = require('./models/VideoGameModel');
const {Genres} = require('./models/GenreModel');
const {Consoles} = require('./models/ConsoleModel');
const {Developers} = require('./models/DeveloperModel');
const {Users} = require('./models/UsersModel');
const {Ratings} = require('./models/RatingsModel');
const {DATABASE_URL, PORT} = require( './config' );
const cors = require( './middleware/cors' );
const app = express();
const jsonParser = bodyParcer.json();
var mongoose = require('mongoose');

app.use( cors );
app.use( express.static( "public" ) );
app.use(morgan('dev'));


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

app.post('/api/games',jsonParser,(req,res)=>{
    console.log( "Body ", req.body );

    let title = req.body.title;
    let description = req.body.description;
    let img_url = req.body.img_url;
    let consoleId = req.body.consoleId;
    let developerId = req.body.developerId;
    let genres = req.body.genres;
    if( !title || !description || !img_url){
        res.statusMessage = "One parameter is missing";

        return res.status( 406 ).end();
    }
    let newVideoGame = { title,description,img_url,consoleId,developerId,genres};
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
    let email = req.body.email;
    if( !name  || !email){
        res.statusMessage = "One parameter is missing";
        return res.status( 406 ).end();
    }
    
    let newUser = { name,email};
    Users
    .createUser(newUser)
    .then(result =>{
        return res.status(201).json(result);
    })
    .catch(err =>{
        res.statusMessage = "Something went wrong with the DB,Try again Later.";
        return res.status(500).end();
    })
});





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

