const errorHandler = (error, req, res, next) => {
    switch (error.name) {
        case "SequelizeDatabaseError":
            return res.status(400).send({ error: error.message });
        case "SequelizeValidationError":
            return res.status(400).send({ error: "Entered username has to be email" });
        case "JsonWebTokenError":
            return res.status(400).send({ error: "Invalid token" });
        default:
            return res.status(400).send({ error });
    }
};

module.exports = errorHandler