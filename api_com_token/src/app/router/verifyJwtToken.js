const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
const db = require('../../config/db.config.js');
const Role = db.role;
const User = db.user;
 
verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'Nenhum token fornecido.' 
		});
	}
 
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Falha na Autenticação. Erro -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}
 
isAdmin = (req, res, next) => {
	
	User.findById(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].nome);
					if(roles[i].nome.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				
				res.status(403).send("Requer Função Administardor!");
				return;
			})
		})
}
 
const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
 
module.exports = authJwt;