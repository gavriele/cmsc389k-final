const fetch = require("node-fetch");
const professorPage = async (req, res) => {
    console.log("professorPage with name: ", req.params.name);
    let resp = await fetch(`http://localhost:3000/api/professor/${req.params.name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    await resp.json()
        .then((json) => {
            return res.render('professor', {
                professor: json.professor[0], 
                reviews: json.professor[0].reviews,
                classes: json.professor[0].classes,
                description: json.professor[0].description,
            });
        });
};

module.exports = professorPage;
