const request_validator_admin = async (req, res, next) => {
    if (req.session.details) {
        if (req.session.details.user_type == "admin") {
            next();
        }
        else {
            res.status(401).json({ "status": false, "message": "unauthorized access" });
        }

    } else {
        res.status(400).json({ "status": false, "message": "Request is empty" });
    }
};

const request_validator_all = async (req, res, next) => {
    if (req.session.details) {
        next();
    }
    else {
        res.status(401).json({ "status": false, "message": "unauthorized access" });
    }


};

module.exports = { request_validator_admin,request_validator_all }