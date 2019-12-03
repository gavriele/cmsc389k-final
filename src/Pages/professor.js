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
            console.log("trying to get name ", json.professor[0].name)
            return res.render('professor', { professor: json.professor[0]});
        });
};

module.exports = professorPage;
