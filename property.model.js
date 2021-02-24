const sql = require("./db.js");

// this class used to create a property model and associated SQL functions with it
const Property = function (data) {
    if (data.id) {
        this.id = data.id;
    }
    this.name = data.name;
    this.description = data.description;
    this.images = data.images;
    this.address = data.address;
    this.locality = data.locality;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.sqArea = data.sqArea;
    if (data.entryDate) {
        this.entryDate = data.entryDate;
    }
    this.viewCount = data.viewCount;
    this.favourite = data.favourite;
    this.price = data.price;
};

Property.getAll = result => {
    sql.query("SELECT * FROM Properties order by EntryDate desc", (err, res) => {
        if (err) {
            console.log("error while fetching all: ", err);
            result(err, null);
            return;
        }
        const data = [];
        res.forEach(result => {
            data.push(new Property({
                id: result.Id,
                name: result.Name,
                description: result.Description,
                images: result.Images,
                address: result.Address,
                locality: result.Locality,
                bedrooms: result.Bedrooms,
                bathrooms: result.Bathrooms,
                sqArea: result.SqArea,
                entryDate: result.EntryDate,
                viewCount: result.ViewCount,
                favourite: result.Favourite,
                price: result.Price
            }))
        });
        console.log("Properties list: ", data);
        result(null, data);
    });
};

Property.getById = (id, result) => {
    sql.query(`SELECT * FROM Properties where Id = ${id}`, (err, res) => {
        if (err) {
            console.log("error while get by Id ", err);
            result(err, null);
            return;
        }
        console.log("Property found by Id: ", res);
        result(null, res);
    });
}

Property.create = (data, result) => {
    sql.query("INSERT INTO Properties SET ?", data, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created property: ", { id: res.insertId, ...data });
        result(null, { id: res.insertId, ...data });
    });
};


Property.deleteById = (id, result) => {
    sql.query("DELETE FROM Properties WHERE Id = ?", id, (err, res) => {
        console.log(err, res);
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ message: "row not found" }, null);
            return;
        }

        console.log("deleted property with id: ", id);
        result(null, res);
    });
};

Property.updateViewCount = (count, id, result) => {
    sql.query(`update Properties set ViewCount = ${count} where Id = ${id};`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("updated view count of property with id: ", id);
        result(null, res);
    });
};

Property.updateFavourite = (fav, id, result) => {
    sql.query(`update Properties set Favourite = ${fav} where Id = ${id};`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("updated favourite of property with id: ", id);
        result(null, res);
    });
};

module.exports = Property;