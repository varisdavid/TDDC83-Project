function addRolesFromSqlServer(user, context, callback) {
  const mysql = require('mysql');
  console.log("trying connection to hostgator");

  const connection = mysql.createConnection({
    host: 'www.lateralsoftwares.com',
    port: 3306,
    user: 'laterres_aditya',
    password: 'adibaba',
    database: 'laterres_healthcare'
  	});

  connection.connect(function(err) {
  	if (err) {
      console.log("connection problem");
    	return callback(err); 
    }
  	console.log("Connected to mysql");
	});
  
  const query = 'SELECT pnumber, role, email FROM users WHERE pnumber = ?';

  connection.query(query, [ user.pnumber ], function(err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback(new WrongUsernameOrPasswordError(user.email));
    user.pnumber = results[0].pnumber;
    
    const roles = results.map((row) => {
    	return row.role;
    });
    
    context.idToken['https://company3.com/roles'] = roles;
    context.idToken['https://company3.com/pnumber'] = results[0].pnumber;

		console.log(results[0].email + " has pnumber " + results[0].pnumber + " has role " + results[0].role);
    return callback(null, user, context);
  });
}