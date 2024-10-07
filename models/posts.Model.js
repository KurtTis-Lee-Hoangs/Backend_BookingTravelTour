import mongodb from "../config/mongoose.js";

const postModel = new mongodb.Schema({
    idPost: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    vote: {
        type: String,
        default: null
    },
    view: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})

const Post = mongodb.model("Posts", postModel);
export default Post;