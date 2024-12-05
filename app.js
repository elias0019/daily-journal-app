const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Start each day by reflecting on your thoughts, feelings, and experiences. Our app gives you a private and secure space to write, track your growth, and capture memories. Whether you want to jot down daily moments or explore deeper insights, journaling has never been easier Start your journey today—one entry at a time.";
const aboutContent = "At this Journal App, we believe in the power of reflection and self-expression. Our goal is to provide a simple, private space where you can capture your thoughts, track your progress, and document your personal journey. Whether you're looking to improve your mental well-being, track daily achievements, or just express yourself, our app makes journaling easy and secure. We’re here to help you create a daily habit of mindfulness, one entry at a time. Start writing today and see how journaling can transform your life.";
const contactContent = "We'd love to hear from you! Whether you have questions, feedback, or need support, our team is here to help. Reach out to us anytime, and we'll respond as quickly as possible.You can contact us through email, or by filling out the form below.Thank you for being part of our journaling community! ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];


app.get("/", (req, res) => {
  res.render("home.ejs", { homeStartingContent: homeStartingContent, posts: posts });
});


app.get("/posts/:title", (req, res) => {
  let found = false; 
  const idTitle = _.lowerCase(req.params.title);

  posts.forEach(element => {
    const elTitle = _.lowerCase(element.title);
    if (elTitle === idTitle) {
      res.render("post.ejs", { element: element });
      found = true; 
    }
  });

  if (!found) {
    console.log("Couldnt find it"); 
  }
});


app.get("/about", (req, res) => {
  res.render("about.ejs", { aboutContent: aboutContent });
});


app.get("/contact", (req, res) => {
  res.render("contact.ejs", { contactContent: contactContent });
});


app.get("/compose",(req, res)=>{
  res.render("compose.ejs");
});


app.post("/compose", (req, res) => {
  const post = {
    title: req.body.composeTitle,
    text: req.body.composeText
  };
  posts.push(post);
  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log("Server started on port 3000");
});
