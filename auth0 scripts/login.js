function login (pnumber, password, callback) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'www.lateralsoftwares.com',
    port: 3306,
    user     : 'laterres_aditya',
    password : 'adibaba',
    database : 'laterres_healthcare'
  });
  connection.connect(function(err) {
  if (err) {
    console.error('error connecting to hostgator: ' + err.stack);
    return callback(err);
  }
  console.log('connected as id ' + connection.threadId);
	});
  
  const query = 'SELECT pnumber, role, email, password FROM users WHERE pnumber = ?';

  connection.query(query, [ pnumber ], function(err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback(new WrongUsernameOrPasswordError(pnumber));
    const user = results[0];
    
    if(password.localeCompare(user.password) == 0) {
      callback(null, {
        user_id: user.pnumber,
        pnumber: user.pnumber,
        email: user.email
      });
    } else {
      console.log('access not granted ' + pnumber + ' ' + password + ' ' + user.pnumber);
      callback(new WrongUsernameOrPasswordError(pnumber));
    }
  });
}