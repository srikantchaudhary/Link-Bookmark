const mongoose = require('mongoose');
const listItemSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const ListItem = mongoose.model("ListItem", listItemSchema);
module.exports = ListItem;