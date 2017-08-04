var express = require('express');
var router = express.Router();
var user_api = require('./api.js');
var nodemailer = require('nodemailer');
var path = require('path');
var multer =require('multer');
var upload = multer({ dest: 'public/uploads/' });
var localStorage = require('localStorage');

router.get('/',function(request,response){
	//response.sendfile('./public/app.html');
	//response.sendFile(path.join(__dirname, './public', 'app.html'));
	var data = localStorage.getItem('_id');
	if(!data)
		response.render('app.ejs');
	else
	{
		user_api.find_user({_id:data},function(err,result){
		if(err)
			response.end(err);
		else
		{
			console.log(result);
			response.render('game',result);
		}
	});
	}


});

router.get('/leaderboard/:id',function(request,response){
	user_api.users(function(err,result){
		if(err)
			response.end();
		else
		{
			var data = result;
			user_api.find_user({'_id':request.params.id},function(err,result){
				if(!err)
					response.render('leaderboard',{'data':data,'id':result});	
				else
					response.render('login');
			});	
		}
	});
	
});





router.get('/login',function(request,response){
	
var data = localStorage.getItem('_id');
	console.log(data);
	if(!data)
		response.render('login.ejs');
	else
		{
			user_api.find_user({_id:data},function(err,result){
		if(err)
			response.end(err);
		else
		{
			console.log(result);
			response.render('game',result);
		}
	});
		}
});

router.get('/verify/:id',function(request,response){
	//response.sendfile('./public/app.html');
	//console.log(request.params.id);
	user_api.verify(request.params.id,function(err,result){
		if(result)
		{
			localStorage.setItem('_id', result.id);
			response.render('game.ejs',result);
		}
			//response.(path.join(__dirname, './public', 'game.html'));
		else
		{
			
			response.end();
		}
	});
});

router.get('/game/:id',function(request,response){
	console.log("this si the game");
	//response.sendFile(path.join(__dirname, './public', 'game.html'));
	user_api.find_user({_id:request.params.id},function(err,result){
		if(err)
			response.end(err);
		else
		{
			console.log(result);
			response.render('game',result);
		}
	});
	
});

router.get('/game',function(request,response){
	
	var name = localStorage.getItem('_id');
	if(!name)
		response.render('login');
	else
	{
		user_api.find_user({_id:name},function(err,result){
		if(err)
			response.end(err);
		elserequest,response
		{
			console.log(result);
			response.render('game',result);
		}
	});
	}
});

router.post('/submit',function(request,response){
	console.log("ghghjghkjhkj",request.body);
	user_api.update_time(request.body.id,request.body.time,function(err,result){
		if(err)
			response.end(err);
		else
			response.render('game',result);
	});
});

router.get('/logout',function(request,response){
	localStorage.clear();
	response.render('app.ejs');
	
});
router.post('/login',function(request,response){
	user_api.login({email:request.body.email},function(err,result){
		
		if(result[0]!=null)
			{
				if(result[0].password==request.body.pass)
				{
					localStorage.setItem('_id', result[0].id);
					response.render('game',result[0]);
				}
				else
				response.end("Invalid Login");	
			}
		else
			response.end("Invalid Login");

	});


});



router.post('/otp',upload.single('file'),function(request,response){

	
	
	//var key_val = Math.floor((Math.random() * 100000));
	var email=request.body.email;
	if(request.body.name=="")
		response.send("Name field cant be empty");
	else if(request.body.email=="")
		response.send("Email field cant be empty");
	else if(request.body.pass=="")
		response.send("Password field cant be empty");
	else if(request.body.conpass=="")
		response.send("Confirm password field cant be empty");
	else if(request.body.pass!=request.body.conpass)
		response.send("Password and confirm Password didnt match");
	else
	{
		user_api.find_user({'email':email},function(err,result){
			if(err)
			console.log(err)
			else
			{
				if(result)
					response.send("user already Exits");
				else{
					
					var add = {
						name:request.body.name,
						email:request.body.email,
						password:request.body.pass,
						photo:'http://localhost:8086/uploads/'+request.file.filename
					};
				
					user_api.add_user(add,function(err,result){
						if(err){
							//response.send("err",err);
							console.log(err);
						}else{
							//response.send("result",result);

							console.log(result);
								
								var transporter = nodemailer.createTransport({
									service : 'Gmail',
									auth:{
										user: 'dumytest6@gmail.com',
										pass: 'qwertyuiop12'
									}

								});
								
								var mailOptions = {
									from : 'dumytest6@gmail.com',
									to: email,
									subject : 'Test mail',
									text: 'Click on the link : http://localhost:8086/verify/'+result._id
								};

								transporter.sendMail(mailOptions,function(err,info){
									if(err){
										console.log("err",err);
									}	else {
										console.log('email send : '+info.response);
									}

									
								});
								response.send("OTP send Check Your Mail For Verification");
						}
						
					});
				}

			}

		});
		
	}
	
	
});


	module.exports = router;