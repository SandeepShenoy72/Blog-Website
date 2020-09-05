//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose')

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

mongoose.connect('mongodb://localhost:27017/blogPost', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const blogSchema = new mongoose.Schema({
  blogTitle:String,
  blogPost:String
});

const Blog = mongoose.model('Blog',blogSchema);



app.get('/',(req,res)=>{
  Blog.find({},(err,posts)=>{
    res.render("home",{content1:homeStartingContent,postNews:posts})
  })

});

app.get('/about',(req,res)=>{
  res.render("about",{content2:aboutContent})
});

app.get('/contact',(req,res)=>{
  res.render("contact",{content3:contactContent})
})

app.get('/compose',(req,res)=>{
  res.render("compose")
});

app.post("/compose",(req,res)=>{
  // let post={
  //   postTitle:req.body.postTitle,
  //   postBody:req.body.postBody
  // }
  const newBlog = new Blog({
    blogTitle:req.body.postTitle,
    blogPost:req.body.postBody
  })


  newBlog.save(function(err){

  if (!err){

    res.redirect("/");

  }

});

  // res.render("post",{postNews:posts})
  // res.redirect('/');

})

app.get('/post/:titleid',(req,res)=>
{
  const titleid = req.params.titleid;

  // posts.forEach(item =>{
  //   const newTitle = _.lowerCase(item.postTitle)
  //   if(newTitle === titleName)
  //   {
  //     res.render("post",{myTitle:newTitle,myContent:item.postBody})
  //   }else{
  //     console.log("Match not found");
  //   }
  // })
  Blog.findOne({_id: titleid}, function(err, post){

   res.render("post", {

     myTitle: post.blogTitle,

     myContent: post.blogPost

   });

 });
})












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
