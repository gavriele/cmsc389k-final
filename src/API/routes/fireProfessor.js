var Professor = require('../models/Professor');
var Class = require('../models/Class');
const fireProfessor = async (req, res) => {
        console.log("req.params " + req.params);

    console.log("You are firing " + req.params.name);
    
    let regex = new RegExp('^' + req.params.name + '$', "i");
    const professor = await Professor.remove({ "name": regex }, function (err, prof) {
        if (err) {
              return res.status(400).json({ error: "Error in firing professor!" });
        } else {
            console.log("You fire this professor: ", prof);
        };
    });
    const removeClass = await Class.remove({ "professor": regex }, function (err, remove) {
        if (err) {
              return res.status(400).json({ error: "Error in removing classes from professor!" });
        } else {
            console.log("You fire remove this class: ", remove);
        };
    });
    res.status(200).json("You fired the professor!");

};

module.exports = fireProfessor;
