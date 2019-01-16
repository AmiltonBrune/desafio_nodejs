const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
 
module.exports = function(app) {
 
	const users = require('../controller/user.controller.js');
	const employees =  require('../controller/employee.controller.js');
	const meetings = require('../controller/meeting.controller.js');
	
 
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], users.signup);
	
	app.post('/api/auth/signin', users.signin);
	
	app.get('/api/test/user', [authJwt.verifyToken], users.userContent);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], users.adminBoard);


    app.post('/api/funcionarios',   employees.create);
 
    app.get('/api/funcionarios',   employees.findAll);
 
    app.get('/api/funcionarios/:id',[authJwt.verifyToken],  employees.findById);
 
    app.put('/api/funcionarios', [authJwt.verifyToken], employees.update);
 
	app.delete('/api/funcionarios/:id', [authJwt.verifyToken], employees.delete);
	
	
	
	app.get('/api/reuniao/:interesseEmComum',  meetings.findById);
	app.get('/api/reuniao', meetings.findAll);
 
   

	
}