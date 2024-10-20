import Post from "../models/posts.Model.js";

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const datasaved = await newPost.save();
    res.status(200).json({
      success: true,
      messgae: "Successfully created.",
      data: datasaved,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const idPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!idPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully updated.",
        data: idPost,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully delete post.",
        data: post,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const posts = await Post.find({})
      .skip(page * 10)
      .limit(10);
    if (!posts) {
      res.status(404).json({ success: false, message: "Post not found." });
    } else {
      res.status(200).json({
        success: true,
        total: posts.length,
        messgae: "Successfully get all posts.",
        data: posts,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found." });
    } else {
      res.status(200).json({
        success: true,
        messgae: "Successfully get post information.",
        data: post,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
