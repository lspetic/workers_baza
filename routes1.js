const sitelist = require('./functions/sitelist');

//rute za kolekciju site
module.exports = router1 =>{

    router1.get('/site',(req,res) =>{
        sitelist.getSite()

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({message: err.message}));

    });
};
