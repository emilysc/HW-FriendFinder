var path = require('path');
var friends = require('../data/friends');
module.exports = (app) => {
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var myScores = req.body.scores || [];
        var minScore, minPerson;
        for (var person of friends) {
            const difference = myScores
                .map((score, index) => Math.abs(score - person.scores[index]))
                .reduce((total, value) => total + value);
            console.log(person.name, difference);
            if (!minScore || minScore > difference) {
                minScore = difference;
                minPerson = person;
            }
        }
        return res.json(minPerson);
    });
};