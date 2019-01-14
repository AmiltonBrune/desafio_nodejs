module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
	  nome: {
		  type: Sequelize.STRING
	  },
	  nomeUsuario: {
		  type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  senha: {
		  type: Sequelize.STRING
	  }
	});
	
	return User;
}