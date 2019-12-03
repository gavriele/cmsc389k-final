var Professor = require('../models/Professor');

const getProfessor = async (req, res) => {
    console.log("req.params.id", req.params.name)

    let regex = new RegExp('^' + req.params.name + '$', "i");
    const professor = await Professor.find({ "name": regex }, function (err, prof) {
        if (err) {
            console.log("Error in getting professor", err);
            return res.status(400).json({error: "Could not get  professor"});
        } else {
            console.log("Here is a professor: ", prof);
        };
    });
    res.status(200).json({ professor });
};

module.exports = getProfessor;