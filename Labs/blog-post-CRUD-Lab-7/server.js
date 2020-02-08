let express = require('express');
let morgan = require('morgan');
let bp = require('body-parser');
let jsonParser = bp.json();
let uuid = require("uuid");

let app = express();

app.use(express.static('public'));

app.use(morgan('dev'));

let listOfPosts = [
    {
        id: uuid.v4(),
        title: "Games actually don´t cause violence",
        content: "Shockingly, games don´t cause violence",
        author: "A very trustfull site",
        publishDate: new Date ("October 13, 2014 11:13:00")
    },
    {
        id: uuid.v4(),
        title: "Food kills hunger",
        content: "When you eat, you stop being hungry",
        author: "Intelligent person",
        publishDate: new Date ("October 24, 2012 11:13:00")
    },
    {
        id: uuid.v4(),
        title: "I like movies",
        content: "I like watching movies, they are fun",
        author: "Person",
        publishDate: new Date ("October 13, 2019 11:13:00")
    },
    {
        id: uuid.v4(),
        title: "I like music",
        content: "I like music, it is fun",
        author: "Person",
        publishDate: new Date ("February 13, 2014 11:13:30")
    }
];

// GET methods ------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/blog-posts', (req, res, next) => {

    // checks if the client is searching for the posts of an specific author
    if (!(req.query.author == null)) {

        // checks if the author was included in the requests
        if (req.query.author == "") {
            res.statusMessage = "Author not defined";
            return res.status(406).json({
                code: 406,
                message: res.statusMessage
            });
        }

        // searches for the posts of the specified author
        let extraListOfPosts = [];
        for (let i = 0; i < listOfPosts.length; i++) {
            if (listOfPosts[i].author == req.query.author) {
                extraListOfPosts.push(listOfPosts[i]);
            }
        }

        // checks if the author requested existed, if not, returns an error
        if (extraListOfPosts.length == 0) {
            res.statusMessage = "Author not found";
            return res.status(404).json({
                code: 404,
                message: res.statusMessage
            });
        }

        // returns the list of all the posts from the specified author
        res.statusMessage = "Succesfull query from specified author";
        return res.status(200).json(extraListOfPosts);
    }

    // returns the list of all posts
    res.statusMessage = "Succesfull query";
    return res.status(200).json(listOfPosts);
    
});

// POST methods ------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/blog-posts", jsonParser, (req, res, next) => {

    // checks that all fields in the body are filled (i am assuming there is always a date)
    // if there is a field missing, we return an error, else we add the post
    if (req.body.title && req.body.content && req.body.author) {
        let newPost = {
            id: uuid.v4(),
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            publishDate: req.body.publishDate
        };

        listOfPosts.push(newPost);

        res.statusMessage = "Post added succesfully";
        return res.status(200).json(newPost);
    } else {
        res.statusMessage = "Missing field in body";
        return res.status(406).json({
            code: 406,
            message: res.statusMessage
        });
    }
});

// DELETE methods ------------------------------------------------------------------------------------------------------------------------------------------------

app.delete("/blog-posts/:id", jsonParser, (req, res, next) => {

    // searches for the post with the id given
    // if the post with the given id is found, it erases it and returns the post with a successfull message
    for (let i = 0; i < listOfPosts.length; i++) {
        if (listOfPosts[i].id == req.params.id) {
            let post = listOfPosts.splice(i,1);

            res.statusMessage = "Post erase succesfully";
            return res.status(200).json(post);
        }
    }

    // in case it doesn't finds a post with the given id, it returns an error and a message that it didn't find it
    res.statusMessage = "Post not found";
    return res.status(404).json({
        code: 404,  
        message: res.statusMessage
    });
});

// PUT methods ------------------------------------------------------------------------------------------------------------------------------------------------

app.put("/blog-posts/:id", jsonParser, (req, res, next) => {

    // checks that there's an id in the body
    if (req.body.id) {

        // checks that the id in the body and params match
        if (req.body.id == req.params.id) {

            // searches for the post with the given id
            for (let i = 0; i < listOfPosts.length; i++) {

                // if it finds the post, it updates it with the given params and returns the updated post with the message that the post
                // was updated successfully
                if (listOfPosts[i].id == req.body.id) {

                    // checks if a new author was given
                    if (req.body.author) {
                        listOfPosts[i].author = req.body.author;
                    }

                    // checks if a new date was given
                    if (req.body.publishDate) {
                        listOfPosts[i].publishDate = req.body.publishDate;
                    }

                    // checks if a new title was given
                    if (req.body.title) {
                        listOfPosts[i].title = req.body.title;
                    }

                    // checks if a new content was given
                    if (req.body.content) {
                        listOfPosts[i].content = req.body.content;
                    }

                    res.statusMessage = "Post updated succesfully";
                    return res.status(200).json(listOfPosts[i]);
                }
            }
            
            // if the post was not found, it returns an error with the message that the post was not found
            res.statusMessage = "Post not in the list";
            return res.status(404).json({
                code: 404,
                message: res.statusMessage
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

app.listen('8080', () => {
    console.log("app running on localhost:8080")
});

