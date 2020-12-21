const Shop = require('../models/shop');


const shop_get = (req, res) => {
    Shop.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('shop', { title:  'Order', shops: result })
    })
    .catch((err) => {
        console.log(err)
    })
};
const shop_post = (req, res) => {
    const shop = new Shop(req.body);
    console.log(req.body);
    shop.save()
        .then((result) => {
            res.redirect('/items');
        })
        .catch((err) => {
            console.log(err);
        });
}
const shop_details =(req, res) => {
    const id = req.params.id;
    Shop.findById(id)
        .then((result) => {
            console.log(id);
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'item not found'});
        })
};
const shop_delete = (req, res) => {
    const id = req.params.id;
    Shop.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect : '/shops' });
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports = { 
    shop_get,
    shop_post,
    shop_delete,
    shop_details
}
