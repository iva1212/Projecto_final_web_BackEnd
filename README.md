Endopints

### /api/users/login
    POST
    Parameters (body of the request) : email, password
    The user will be Logged in

### /api/games
    POST
    Parameters (body of the request) : title, description, year, img_url, consoles, developerId, genres
    It will create a new game
    GET
    It will get all videogames

### /api/game/:id
    GET
    Parameters (header of the request) : id
    It will get you the game with the specified id

### /api/consoles
    POST
    Parameters (body of the request) : name, img_url, description
    By sending the name of the console, a description and an image_url, it will create a new console
    GET
    It will get a list of all the genres

### /api/developers
    POST
    Parameters (body of the request) : name, img_url, country
    By sending the name of the developer, country of origin of the developer and an image url, it will create a new developer
    GET
    It will get a list of all the genres

### /api/genres
    POST
    Parameters (body of the request) : name, img_url
    By sending the name of the genre, and an image url, it will create a new genre
    GET
    It will get a list of all the genres

### /api/rating
    Parameters (header of the request) : email, gameId, stars, review
    POST
    Sending the user email, the videogame Id, stars and a review of the game in the body of the request, a rating will be created

### /api/ratingsByUser/:Email
    Parameters (header of the request) : email
    GET
    By sending the user email in the header, you will get the ratings that that user has given

### /api/ratingsByGame/:gameId
    Parameters (header of the request) : id
    GET
    By sending the videogame id in the header, you will get the ratings of said videogame

### /api/users
    POST
    Parameters (body of the request) : email, name, last_name, password
    By sending the user email, name, last name and password in the body of the request, a new user will be created
    GET
    It will automatically get all users

### /api/videogamesByGenre/:nameGenre
    Parameters (header of the request) : name
    GET
    By sending the name of the genre in the header of the request, you will get a list of the videogames with that genre

### /api/videogamesByDeveloper/:nameDeveloper
    Parameters (header of the request) : name
    GET
    By sending the developer name in the header of the request, you will get a list of the developers with that name

### /api/videogamesByConsole/:nameConsole
    Parameters (header of the request) : name
    GET
    By sending the console name in the header of the request, you will get a list of the consoles with that name

### /api/videoGamesByTitle/:titleGame
    Parameters (header of the request) : title
    GET
    By sending the videogame title in the header of the request, you will get a list of the videogames with that title

### /api/removeUser
    Parameters (body of the request) : name
    DELETE
    With the name of the user sent in the body of the request, the user will be deleted

### /api/removeVideoGame
    Parameters (body of the request) : title
    DELETE
    With the title of the videogame sent in the body of the request, the videogame will be deleted

### /api/removeDeveloper
    Parameters (body of the request) : name
    DELETE
    With the name of the developer sent in the body of the request, the developer will be deleted

### /api/removeConsole
    Parameters (body of the request) : name
    DELETE
    With the name of the console sent in the body of the request, the console will be deleted

### /api/removeGenre
    Parameters (body of the request) : name
    DELETE
    With the name of the genre sent in the body of the request, the genre will be deleted

### /api/likeGame
    Parameters (body of the request) : email, id
    POST
    With the user email and videogame id sent in the body of the request, the videogame id will be added to the users liked games

### api/likeGame/:userEmail
    Parameters (header of the request) : email
    GET
    Sending the user email, you will get a list of all the users liked games

### /api/deleteLikedGame
    Parameters (body of the request) : email, id
    DELETE
    Sending the user email and the videogame id, that videogame will be removed from the users liked games 

/api/isLiked : 

### /api/recommendedGames
    GET
    Parameters (body of the request) : email
    Sending the user email, you will get a list of recommended games based on the genre of the users liked games