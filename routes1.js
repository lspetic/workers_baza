const sitelist = require('./functions/sitelist');

//rute za kolekciju site
module.exports = router1 =>{

    router1.get('/site',(req,res) =>{
        sitelist.getSite()

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({message: err.message}));





    });

    router1.put('/site/:id',(req,res)=>{

        if (1==1) {
            const name = req.params.id;
            const br_radnika = req.body.br_radnika;
            const address = req.body.address;
            const latlong = req.body.latlong;
            console.log(br_radnika);
            if(!br_radnika){

                res.status(400).json({ message: 'Invalid Request !' });

            } else {

                sitelist.putSite(name,br_radnika,address,latlong)

                    .then(result => res.status(result.status).json({ message: result.message }))

                    .catch(err => res.status(err.status).json({ message: err.message }));

            }

        }else {
            res.status(401).json({ message: 'Invalid Token !' });
        }
        console.log(req.body.name);

    });

    router1.get('/site/one/:name',(req,res) =>{
        let be = req.params.name;
        sitelist.getSiteOne(be)

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({message: err.message}));





    });

};


