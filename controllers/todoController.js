// JavaScript Document

//var data = [{item: 'eat'}, {item: 'sleep'}, {item: 'code'}, {item: 'get milk'}, {item: 'make bed'}, {item: 'create app'}];

module.exports = function(app, db, passport){

//	CRUD - Creat Read Update Destroy
//  crud is the basis of all applications
//  Update will not be included in this application

	app.get('/', isLoggedIn,function(req, res){
		//read
		console.log('Read');
		let sql = 'select * from todoItems WHERE userID=' + req.user.id +';';
		db.query(sql, (err, results) => {
			if(err) throw err;
			console.log(results);
			res.render('todo', {todos: results, user: req.user});
		});
	});



	app.post('/todo', function(req, res){
		//create
		console.log('Create');
		let item = req.body;
		item['userID'] = req.user.id
		console.log(item);
		let sql ='insert into todoItems SET ?';
		let query = db.query(sql, item, (err, result) =>{
			if (err) throw err;
			console.log(result);
			res.json(result);
		});

	});

	app.delete('/todo/:id',function(req, res){
		//delete
		console.log('Delete');
		let item = req.body;
		console.log(req.params.item);
		let sql =`delete from todoItems where id = ${req.params.id}`;

		let query = db.query(sql, item, (err, result) =>{
			if (err) throw err;
			console.log(result);
			res.json(result);
		});
		//filters data from the array
//		data = data.filter(function(todo){
//			return todo.item.replace(/ /g, '-') !== req.params.item ;
//		});
	});
// display signup

app.get('/signup', function(req,res){

	res.render('signup');

});

  app.post('/signup', passport.authenticate('local-signup',  {
     successRedirect: '/todo',
     failureRedirect: '/signup'}
    )
  );
	app.get('/signin', function(req,res){

		res.render('signin', {message: req.flash('loginMessage')}, );

	});

	app.post('/signin', passport.authenticate('local-signin',  {
     successRedirect: '/',
     failureRedirect: '/signin'}
    )
  );
app.get('/logout',function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/signin');
});











});
};
function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
				return next();

		res.redirect('/signin');
}
