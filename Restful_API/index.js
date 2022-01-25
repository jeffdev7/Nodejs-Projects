const express = require ('express')

const app = express()
const port = 3000;

//parse JSON with express
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));

let movies = [
    {
        id: '1',
        title: 'Inception',
        director: 'Christopher Nolan',
        release_date: '16-07-2010'

    },
    {
        id: '2',
        title: 'The Irishman',
        director: 'Martin Scorsese',
        release_date: '27-09-2019'

    },
];

//get the movie list
app.get('/movie', (req, res) => {
    res.json(movies)
})

//add movie to the list
app.post('/movie', (req,res) => {
    const movie = req.body

    console.log(movie)
    movies.push(movie)
    res.send('Movie is added to the list!');
});

//search for a movie 
app.get('/movie/:id', (req, res) => {
    const id = req.params.id

    for(let movie of movies) {
        if(movie.id === id){
            res.json(movie)
            return
        }
    }
    res.status(404).send('Movie not found')
})

//remove a movie
app.delete('/movie/:id', (req,res) => {
    const id = req.params.id

    movies = movies.filter(movie => {
        if(movie.id !== id) {
            return true
        }
        return false
    })
    res.send("Movie is deleted")
})

//set the server to listen at the port
app.listen(port, () => console.log(`Server listening at port ${port}`));