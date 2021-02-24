const Property = require('./property.model');

// This is the controller file - used to handle the request and call appropreate
// sql query, perform data manupulation and handle errors

exports.getAll = (req, res) => {
    Property.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving properties.'
            });
        res.send(data);
    })
};

exports.getById = (req, res) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        res.status(500).send({
            message: 'Please send valid id'
        })
    }
    Property.getById(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving property by id.'
            });
        res.send(data);
    })
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a new property
    const newProperty = new Property({
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        address: req.body.address,
        locality: req.body.locality,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        sqArea: req.body.sqArea,
        entryDate: req.body.entryDate,
        viewCount: req.body.viewCount,
        favourite: req.body.favourite,
        price: req.body.price
    });

    // Save property in the database
    Property.create(newProperty, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding new property."
            });
        else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        res.status(500).send({
            message: 'Please send valid id'
        })
    }
    Property.deleteById(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting property.'
            });
        res.send(data);
    })
};

exports.updateViewCount = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Property can not be updated!"
        });
    }
    Property.updateViewCount(req.body.count, req.body.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while updating view count'
            });
        res.send(data);
    })
};

exports.updateFavourite = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Property can not be updated!"
        });
    }
    Property.updateFavourite(req.body.favourite, req.body.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while updatig favourite'
            });
        res.send(data);
    })
};
