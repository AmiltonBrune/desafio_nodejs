const db = require('../../config/db.config.js');
const config = require('../../config/config.js');
const User = db.user;
const Role = db.role;
 
const Op = db.Sequelize.Op;
 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
 
exports.signup = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	
	User.create({
		nome: req.body.nome,
		nomeUsuario: req.body.nomeUsuario,
		email: req.body.email,
		senha: bcrypt.hashSync(req.body.senha, 8)
	}).then(user => {
		Role.findAll({
		  where: {
			nome: {
			  [Op.or]: req.body.roles.map(role => role.toUpperCase())
			}
		  }
		}).then(roles => {
			user.setRoles(roles).then(() => {
				var text = 'Obrigado por se cadastrar {fulano}, seja bem vindo ao nosso sistema';
				text = text.replace('{fulano}', req.body.nome)
				require('../../config/mail')(req.body.email, 'Cadastro realizado com sucesso!', text);
				res.send("Usuário registrado com sucesso!");
            });
		}).catch(err => {
			res.status(500).send("Erro -> " + err);
		});
	}).catch(err => {
		res.status(500).send("Falha! Erro -> " + err);
	})
}
 
exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			nomeUsuario: req.body.nomeUsuario
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('Usuário não encontrado.');
		}
 
		var senhaInvalida = bcrypt.compareSync(req.body.senha, user.senha);
		if (!senhaInvalida) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Senha Inválida!" });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 3600 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Erro -> ' + err);
	});
}
 
exports.userContent = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['nome', 'nomeUsuario', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'nome'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"descrição": "Usuario",
			"usuario": user
		});
	}).catch(err => {
		res.status(500).json({
			"descrição": "Não pode acessar a pagina do usuário",
			"erro": err
		});
	})
}
 
exports.adminBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['nome', 'nomeUsuario', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'nome'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"descrição": "Administrador",
			"ussuárior": user
		});
	}).catch(err => {
		res.status(500).json({
			"descrição": "Não pode acessar a pagina do administrador",
			"erro": err
		});
	})
}
 
