const register = (req, res) => {

    console.log(req.body);

    res.json({
        ok: true,
        msg: req.body
    })

}

module.exports = {
    register
}