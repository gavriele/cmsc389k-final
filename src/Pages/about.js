const fetch = require("node-fetch");

const aboutPage = async (req, res) => {
    let resp = await fetch('http://localhost:3000/about', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    await resp.json()
        .then((json) => {
            return res.render('about', { data: json.professors });
        });
};

module.exports = homePage;