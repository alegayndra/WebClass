let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let postSchema = mongoose.Schema ({
    title: {type: String, require: true},
    content: {type: String, require: true},
    author: {type: String, require: true},
    publishDate: {type: Date, require: true},
    id: {type: String, require: true}
});

let Post = mongoose.model('Blog-post', postSchema);

let PostList = {
    get: function(){
        return Post.find()
            .then( posts => {
                return posts;
            })
            .catch( error => {
                throw Error( error );
            });
		
	},
    post: function(newPost) {
        return Post.create(newPost)
            .then( post => {
                return post;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    update: function(updatedPost) {
        return Post.findOneAndUpdate({_id:updatedPost.id}, {$set:{updatedPost}}) // findByIdAndUpdate
            .then( post => {
                return post;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    delete: function(postID) {
        return Post.findOneAndRemove({_id:postID}) // findByIdAndDelete
            .then( post => {
                return post;
            })
            .catch( error => {
                throw Error( error );
            });
    }
};

module.exports = {PostList};