module.exports = {
    list: (req, res) => {
        console.log(req.method);
        res.send('/video list');
    }
 }