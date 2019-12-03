var Class = require('../models/Class');

const getProfessor = async (req, res) => {
    console.log("req.params.id", req.params.title)

    let regex = new RegExp('^' + req.params.title + '$', "i");
    const my_class = await Class.find({ "title": regex }, function (err, curr_class) {
        if (err) {
            console.log("Error in getting class", err);
            return res.status(400).json({error: "Could not get  class"});
        } else {
            console.log("Here is a class: ", curr_class);
        };
    });
    res.status(200).json({ my_class });
};

module.exports = getProfessor;