const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs; 
const User = db.user;
const Role = db.role;
 
checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> Check Username is already in use
	User.findOne({
		where: {
			nomeUsuario: req.body.nomeUsuario
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Falha -> Este nome de ussuário já esta sendo utlizado");
			return;
		}
		
		// -> Check Email is already in use
		User.findOne({ 
			where: {
				email: req.body.email
			} 
		}).then(user => {
			if(user){
				res.status(400).send("Falha-> Este email já esta sendo utlizado!");
				return;
			}
				
			next();
		});
	});
}
 
checkRolesExisted = (req, res, next) => {	
	for(let i=0; i<req.body.roles.length; i++){
		if(!ROLEs.includes(req.body.roles[i].toUpperCase())){
			res.status(400).send("Falha -> Does NOT exist Role = " + req.body.roles[i]);
			return;
		}
	}
	next();
}
 
const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;
 
module.exports = signUpVerify;