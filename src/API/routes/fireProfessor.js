var Professor = require('../models/Professor');

const fireProfessor = async (req, res) => {
        console.log("req.params " + req.params);

    console.log("You are firing " + req.params.name);
    
    let regex = new RegExp('^' + req.params.name + '$', "i");
    const professor = await Professor.remove({ "name": regex }, function (err, prof) {
        if (err) {
            console.log("Error in firing professor", err);
        } else {
            console.log("You fire this professor: ", prof);
        };
    });
    res.status(200).json("You fired the professor!");

};

module.exports = fireProfessor;
