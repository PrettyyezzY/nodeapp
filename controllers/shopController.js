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
    shop.save()
        .then((result) => {
            res.redirect('/shops');
        })
        .catch((err) => {
            console.log(err);
        });
}
const shop_details =(req, res) => {
    const id = req.params.id;
    Shop.findById(id)
        .then((result) => {
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'item not found'});
        })
};
const shop_put = (req, res) => {
    const id = req.params.id;
    Shop.findByIdAndUpdate(id, { status: true } )
        .then((result) => {
            res.json({ redirect : '/shops' });
        })
        .catch((err) => {
            console.log(err);
        });
};
//TODO: Zmniejszanie ilości towaru
//TODO: Rozliczanie kilku pozycji -> ForEach? 

//TODO: Frontend 
//TODO: -> Komunikat o kwocie i kontakcie

//TODO: LATER -> Docker

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
    shop_details,
    shop_put
}
