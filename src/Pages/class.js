const fetch = require("node-fetch");
const classPage = async (req, res) => {
    console.log("inside class page")
    let resp = await fetch(`http://localhost:3000/api/class/${req.params.title}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    await resp.json()
        .then((json) => {
            console.log("trying to get class ", json.my_class[0].title)
            return res.render('class', { class: json.my_class[0], grades: json.my_class[0].grades});
        });
};

module.exports = classPage;