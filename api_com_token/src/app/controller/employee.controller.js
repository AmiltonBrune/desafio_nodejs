const db = require('../config/db.config.js');

const Employee = db.employee;

// Post a Employee
exports.create = (req, res) => {	
	// Save to PostgreSQL database
	Employee.create(req.body).then(employee => {		
			// Send created employee to client
			res.json(employee);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "erro", details: err});
		});
};
 
// FETCH All Employee
exports.findAll = (req, res) => {
	Employee.findAll().then(employees => {
			// Send All Employee to Client
			res.json(employees);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "erro", details: err});
		});
};
 
// Find a Employee by Id
exports.findById = (req, res) => {	
	Employee.findById(req.params.id).then(employee => {
			res.json(employee);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "erro", details: err});
		});
};
 
// Update a Employee
exports.update = (req, res) => {
	const id = req.body.id;
	Employee.update( req.body, 
			{ where: {id: id} }).then(() => {
				res.status(200).json( { mgs: "Atualizado com Sucesso -> Funcionário Id = " + id } );
			}).catch(err => {
				console.log(err);
				res.status(500).json({msg: "erro", details: err});
			});
};
 
// Delete a Employee by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Employee.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Excluído com Sucesso -> Funcionário Id = ' + id } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "erro", details: err});
		});
};