var Grade = require('../models/Grade');

const getGradesFromProf = async (req, res) => {
    console.log("req.params.id", req.params.name)
    let regex = new RegExp('^' + req.params.name + '$', "i");
    const grades = await Grade.find({ "professor": regex }, function (err, grade) {
        if (err) {
            console.log("Error in getting professor", err);
            return res.status(400).json({error: "Error in getting grades"})
        } else {
            console.log("Here is a grade: ", grade);
        };
    });
    res.status(200).json({ grades });

};

module.exports = getGradesFromProf;