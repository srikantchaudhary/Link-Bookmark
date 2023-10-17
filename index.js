const express = require('express');
const port = 3000;
const path = require('path');
const db = require("./config/mongoose");
const ListItem = require("./models/item");

const app = express();

app.use(express.urlencoded());
app.use(express.static("assests"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, resp){
    // Fetching data from database and displaying it
    ListItem.find({}, function(err, items){
        if(err){
            console.log("Error in fetching items: ", err);
            return;
        }

        return resp.render('home', {
            items: items
        });
    });
});

app.post('/add-item', function(req, resp){
    //console.log(req.body);

    // Creating a document and adding it to the collection that we imported
    ListItem.create(req.body, function(err, newItem){
        if(err){
            console.log("Error in creating item: ", err);
            return;
        }
        //console.log(newItem);

        // To go back to immediate previous page...we can go as
        return resp.redirect("back");
    });
});

app.get('/delete-item', function(req, resp){
    let id = req.query.id;
    ListItem.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting: ", err);
            return;
        }
        return resp.redirect("back");
    });
});

// ----------------Server-----------------

app.listen(port, function(err){
    if(err){
        console.log("Error in starting server.", err);
        return;
    }

    console.log("Express server started!!");
});