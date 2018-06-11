'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./functions/register');
const login = require('./functions/login');
const profile = require('./functions/profile');
const sitelist = require('./functions/sitelist');
const job = require('./functions/job.js');
const password = require('./functions/password');
const config = require('./config/config.json');

module.exports = router => {

	//router.get('/', (req, res) => res.end('Welcome !'));

	router.post('/authenticate', (req, res) => {

		const credentials = auth(req);

		if (!credentials) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(credentials.name, credentials.pass)

			.then(result => {

				const token = jwt.sign(result, config.secret, { expiresIn: 1440 });
			
				res.status(result.status).json({ message: result.message, token: token });

			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
	router.get('/false',(req,res) => { //koristimo

            profile.getProfileAv(true)

                .then(result => res.json(result))

                .catch(err => res.status(err.status).json({message: err.message}));

	});
    router.get('/true',(req,res) => {//koristimo

        profile.getProfileUn(true)

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({message: err.message}));
    });

    router.get('/site',(req,res) =>{//koristimo
        sitelist.getSite()

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({message: err.message}));

	});
    router.get('/list/:srt/',(req,res) => {//koristimo
    	//console.log(req.params.id);
		//console.log(req.params.srt);

        const aaa=req.params.srt;
        profile.getProfileAll()

            .then(result => res.json(result.sort({aaa:1})))

            .catch(err => res.status(err.status).json({message: err.message}));
	});

    router.get('/list/:flg/:srt/',(req,res) => {//ne koristimo trenutno
        //console.log(req.params.id);
        //console.log(req.params.srt);

        const aaa=req.params.srt;
        const flag=req.params.flg;

        profile.getProfileAv(flag)

            .then(result => res.json(result.sort({aaa:1})))

            .catch(err => res.status(err.status).json({message: err.message}));
    });

    router.get('/users/:id', (req,res) => { //ne koristimo trenutno
        const aaa=req.params.srt;
        if (1==1) {

            profile.getProfileAll(req.params.id)

                .then(result => res.json(result.sort({aaa:1})))

                .catch(err => res.status(err.status).json({ message: err.message }));


        } else {

            res.status(401).json({ message: 'Invalid Token !' });
        }
    });


	router.post('/users', (req, res) => {

		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		const proffesion = req.body.proffesion;
		const permission = req.body.permission;

		if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {

			res.status(400).json({message: 'Invalid Request !'});

		} else {

			register.registerUser(name, email, password, proffesion, permission)

			.then(result => {

				res.setHeader('Location', '/users/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});



	router.put('/users/:id', (req,res) => {

		if (checkToken(req)) {

			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;

			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});
	router.put('/users/:id/job',(req,res)=>{

        if (1==1) {
            const email = req.params.id;
            const start_job = req.body.start_job;
            const end_job = req.body.end_job;
            const gradiliste = req.body.gradiliste;
            if(!start_job || !end_job || !gradiliste || !start_job.trim() || !end_job.trim() || !gradiliste.trim()){

                res.status(400).json({ message: 'Invalid Request !' });

			} else {

            	job.putJob(email,start_job,end_job,gradiliste)

                   .then(result => res.status(result.status).json({ message: result.message }))

                   .catch(err => res.status(err.status).json({ message: err.message }));

			}

        }else {
            res.status(401).json({ message: 'Invalid Token !' });
		}
        console.log(req.body.end_job);

	});

	router.post('/users/:id/password', (req,res) => {

		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(email)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(email, token, newPassword)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);
  				console.log(decoded.message);
  				console	.log(req.params.id);

  				return decoded.message === req.params.id;

			} catch(err) {
				console.log(err.toString());

				return false;
			}

		} else {

			return false;
		}
	}
};