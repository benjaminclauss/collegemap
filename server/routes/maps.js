const express = require('express');
const router = express.Router();
const Map = require('../models/map');

router.route('/maps')
    .get(function (req, res) {
        Map.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        }).populate('attendees.college');
    })

    .post(function (req, res) {
        const map = new Map();      // create a new instance of the Map model
        map.name = req.body.name;  // set the bears name (comes from the request)

        map.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Map created!'});
        });
    });


router.route('/maps/:map_id')
    .get(function (req, res) {
        Map.findById(req.params.map_id, function (err, map) {
            if (err)
                res.send(err);
            res.json(map);
        }).populate('attendees.college');
    })

    .put(function (req, res) {
        // use our map model to find the map we want
        Map.findById(req.params.map_id, function (err, map) {

            if (err)
                res.send(err);

            map.name = req.body.name; // update the maps info
            map.attendees = req.body.attendees;

            // save the map
            map.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'map updated!'});
            });

        });
    })

    // delete the map with this id (accessed at DELETE http://localhost:8080/api/maps/:map_id)
    .delete(function (req, res) {
        Map.remove({
            _id: req.params.map_id
        }, function (err, map) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });

module.exports = router;
