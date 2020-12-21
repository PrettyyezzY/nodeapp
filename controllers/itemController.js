const Item = require('../models/item');

const item_index = (req, res) => {
    Item.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title:  'All items', items: result })
    })
    .catch((err) => {
        console.log(err)
    })
} ;
const item_details =(req, res) => {
    const id = req.params.id;
    Item.findById(id)
        .then((result) => {
            res.render('details', { item: result, title: 'item Details'});
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'item not found'});
        })
};
const item_create_get = (req, res) => {
    res.render('create', {title: 'Create'});
};
const item_create_post = (req, res) => {
    const item = new Item(req.body);
    console.log(req.body);
    item.save()
        .then((result) => {
            res.redirect('/items');
        })
        .catch((err) => {
            console.log(err);
        });
}
const item_delete = (req, res) => {
    const id = req.params.id;
    Item.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect : '/items' });
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports = { 
    item_index,
    item_details,
    item_create_get,
    item_create_post,
    item_delete
}
