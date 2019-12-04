const fetch = require("node-fetch");
var dataUtil = require("../data-util");
var _DATA = dataUtil.loadData().professors;

const homePage = async (req, res) => {
    let resp = await fetch('http://localhost:3000/api/professors', {
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
