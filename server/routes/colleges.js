var express = require('express');
var router = express.Router();
var College = require('../models/college');

router.route('/colleges')
    .get(function (req, res) {
        College.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    })

    .post(function (req, res) {
        const college = new College();      // create a new instance of the College model
        college.name = req.body.name;  // set the bears name (comes from the request)

        college.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'College created!'});
        });
    });


router.route('/colleges/:college_id')
    .get(function (req, res) {
        College.findById(req.params.college_id, function (err, college) {
            if (err)
                res.send(err);
            res.json(college);
        });
    })

    .put(function (req, res) {
        // use our college model to find the college we want
        College.findById(req.params.college_id, function (err, college) {

            if (err)
                res.send(err);

            college.name = req.body.name;  // update the colleges info

            // save the college
            college.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'college updated!'});
            });

        });
    })

    // delete the college with this id (accessed at DELETE http://localhost:8080/api/colleges/:college_id)
    .delete(function (req, res) {
        College.remove({
            _id: req.params.college_id
        }, function (err, college) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });

module.exports = router;
