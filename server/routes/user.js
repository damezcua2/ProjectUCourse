var express = require('express');
//look this shit up
//var HttpStatus = require('http-status-codes');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../../models/user');
var Course = require('../../models/course');

// post route creates user
router.post('/', function (req, res, next) {
  var user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    schoolName: req.body.schoolName,
    userType: req.body.userType,
    biography: ""
  });
  user.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error ocurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});
router.patch('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured!',
        error: err
      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'No user was found!',
        error: {
          message: 'user was not found!'
        }
      });
    }
    user.email = req.body.email;
    user.biography = req.body.biography;
    user.profilePic = req.body.profilePic;
    user.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated user',
        obj: result
      });
    });
  });
})
router.patch('/:id/:registrationNum', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured!',
        error: err
      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'No user was found!',
        error: {
          message: 'user was not found!'
        }
      });
    }
    Course.findOne({ registrationNumber: req.params.registrationNum },
      function (err, course) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured!',
            error: err
          });
        }
        if (!course) {
          return res.status(500).json({
            title: 'No course was found!',
            error: {
              message: 'course was not found!'
            }
          });
        }
        user.courseList.push(course._id);
        user.save(function (err, user) {
          if (err) {
            return res.status(500).json({
              title: 'An error occured!',
              error: err
            });
          }
          res.status(200).json({
            message: 'Registered user for course, returning course',
            // returning course to display on dashboard
            obj: course
          });
        });
      });
  });
})
// post route to sign in
router.post('/signin', function (req, res, next) {
  // find user by email, since it is unique
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    // if mongo throws error, return error
    if (err) {
      return res.status(500).json({
        title: 'An error occured!',
        error: err
      });
    }
    // if there is no such user, return basic error
    if (!user) {
      return res.status(401).json({
        title: 'Login Failed!',
        error: {
          message: 'Invalid login credentials'
        }
      });
    }
    // if password is incorrect, return basic error
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login Failed!',
        error: {
          message: 'Invalid login credentials'
        }
      });
    }
    // Generate auth token
    var token = jwt.sign({
      user: user
    },
      /* this is a secret string, that generates hash */
      'In Kor lies Morz, the frozen throne' +
      'Where lord’s of lakes, have made their home', {
        expiresIn: 7200 /*2 hours*/
      }
    );
    res.status(200).json({
      message: 'Succesfully logged in',
      token: token,
      userId: user._id,
    });
  });
})
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred!',
        error: err
      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'No user was found!',
        error: {
          message: 'user was not found!'
        }
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: user
    });
  });
});
module.exports = router;
