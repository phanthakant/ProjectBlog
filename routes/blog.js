var express = require('express');
var router = express.Router();

const { body, validationResult, check, Result } = require('express-validator');


const db = require('monk')("localhost:27017/TutorialDB")

/* GET users listing. */
router.get('/', function (req, res, next) {
   res.render("blog");
});
router.get('/add', function (req, res, next) {
   res.render("addblog");
});
router.post('/add',[
   check("name","please enter blog name").not().isEmpty(),
   check("description","please enter blog description").not().isEmpty(),
   check("author","please enter blog author").not().isEmpty(),

], function (req, res, next) {
   const result = validationResult(req);
   var errors=result.errors
  if (!result.isEmpty()) {
   res.render('addblog',{errors:errors});
  }
  else{
    var ct=db.get('blogs')
    ct.insert({
       name:req.body.name,
       description:req.body.description,
       author:req.body.author
    },function(err,blog){
       if(err){
          res.send(err);
       }else{
          req.flash("error","blog saved")
          res.location('/blog/add');
          res.redirect('/blog/add')
       }
      });
    }
  
});

module.exports = router;
