module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('employees', {
	  nome: {
		  type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
      },
	  telefone: {
		  type: Sequelize.STRING
	  },
	  cargo: {
		  type: Sequelize.STRING
	  },
	  interesse: {
		  type: Sequelize.STRING
	  }
	});
	
	return Employee;
}