const fetch = require("node-fetch");

const homePage = async (req, res) => {
    let resp = await fetch('http://localhost:3000/form', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    await resp.json()
        .then((json) => {
            return res.render('home', { data: json.professors });
        });
};

module.exports = homePage;