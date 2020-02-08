let express = require('express');
let morgan = require('morgan');
let bp = require('body-parser');
let jsonParser = bp.json();
let uuid = require("uuid");

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let {PostList} = require('./blog-post-model');

let {DATABASE_URL, PORT} = require('./config');

let app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// GET methods ------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/blog-posts', (req, res, next) => {
    PostList.get()
		.then( Post => {
			return res.status( 200 ).json( Post );
		})
		.catch( error => {
			res.statusMessage = "Something went wrong with the DB. Try again later.";
			return res.status( 500 ).json({
				status : 500,
				message : "Something went wrong with the DB. Try again later."
			})
		});

    // // checks if the client is searching for the posts of an specific author
    // if (!(req.query.author == null)) {

    //     // checks if the author was included in the requests
    //     if (req.query.author == "") {
    //         res.statusMessage = "Author not defined";
    //         return res.status(406).json({
    //             code: 406,
    //             message: res.statusMessage
    //         });
    //     }

    //     // searches for the posts of the specified author
    //     let extraListOfPosts = [];
    //     for (let i = 0; i < listOfPosts.length; i++) {
    //         if (listOfPosts[i].author == req.query.author) {
    //             extraListOfPosts.push(listOfPosts[i]);
    //         }
    //     }

    //     // checks if the author requested existed, if not, returns an error
    //     if (extraListOfPosts.length == 0) {
    //         res.statusMessage = "Author not found";
    //         return res.status(404).json({
    //             code: 404,
    //             message: res.statusMessage
    //         });
    //     }

    //     // returns the list of all the posts from the specified author
    //     res.statusMessage = "Succesfull query from specified author";
    //     return res.status(200).json(extraListOfPosts);
    // }

    // // returns the list of all posts
    // res.statusMessage = "Succesfull query";
    // return res.status(200).json(listOfPosts);
    
});

// POST methods ------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/blog-posts", jsonParser, (req, res, next) => {
    let newPost = {
        title: "", 
        content: "", 
        id: "", 
        publishDate: "", 
        author: ""
    };
    newPost.author = req.body.author;
    newPost.title = req.body.title;
    newPost.publishDate = req.body.publishDate;
    newPost.content = req.body.content;
    newPost.id = uuid.v4();

    if (!newPost.id || !newPost.title || !newPost.content || !newPost.publishDate || !newPost.author) {
        res.statusMessage = "Missing field in the body";
        return res.status(406).json( {
            message: "Missing field in the body",
            status: 406
        });
    }
  
    PostList.post(newPost)
        .then(post => {
            return res.status(201).json(post);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status(500).json({
                message: "Something went wrong with the DB",
                status: 500
            })
        });
});

// DELETE methods ------------------------------------------------------------------------------------------------------------------------------------------------

app.delete("/blog-posts/:id", jsonParser, (req, res, next) => {

    PostList.delete(req.params.id)
        .then(post => {
            return res.status(201).json(post);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status(500).json({
                message: "Something went wrong with the DB",
                status: 500
            })
        });

    // // searches for the post with the id given
    // // if the post with the given id is found, it erases it and returns the post with a successfull message
    // for (let i = 0; i < listOfPosts.length; i++) {
    //     if (listOfPosts[i].id == req.params.id) {
    //         let post = listOfPosts.splice(i,1);

    //         res.statusMessage = "Post erase succesfully";
    //         return res.status(200).json(post);
    //     }
    // }

    // // in case it doesn't finds a post with the given id, it returns an error and a message that it didn't find it
    // res.statusMessage = "Post not found";
    // return res.status(404).json({
    //     code: 404,  
    //     message: res.statusMessage
    // });
});

// PUT methods ------------------------------------------------------------------------------------------------------------------------------------------------

app.put("/blog-posts/:id", jsonParser, (req, res, next) => {

    // checks that there's an id in the body
    if (req.body.id) {

        // checks that the id in the body and params match
        if (req.body.id == req.params.id) {

            PostList.update(req.body)
                .then(post => {
                    return res.status(201).json(post);
                })
                .catch(err => {
                    res.statusMessage = "Something went wrong with the DB";
                    return res.status(500).json({
                        message: "Something went wrong with the DB",
                        status: 500
                    })
                });
        } else {

            // if the id's did not match, it returns an error with the message that the id's did not match
            res.statusMessage = "ID in param does not match with ID in body";
            return res.status(409).json({
                code: 409,
                message: res.statusMessage
            });
        }
    } else {
        
        // if no id was given in the body, it returns an error with the message that no id was given in the body
        res.statusMessage = "Missing ID in body";
        return res.status(406).json({
            code: 406,
            message: res.statusMessage
        });
    }

});

let server;

function runServer(port, databaseUrl) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, response => {
            if (response) {
                return reject(response);
            }
            else {
                server = app.listen(port, () => {
                    console.log("App is running on port " + port);
                    resolve();
                })
                    .on('error', err => {
                        mongoose.disconnect();
                        return reject(err);
                    })
            }
        });
    });
}

function closeServer() {
    return mongoose.disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log('Closing the server');
                server.close(err => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
}

runServer(PORT, DATABASE_URL)
    .catch(err => {
        console.log(err);
    });

module.exports = { app, runServer, closeServer };


