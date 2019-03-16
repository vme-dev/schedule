var express = require('express');
var Post = require('../models/Post.js')
var parent = new Post();

var fs = require('fs');
var router = express.Router();


// function getExt (str) {
// 	var pos = str.lastIndexOf(".");
// 	var newStr = str.substring(pos );

// 	return newStr;
// };


router.get('/get', (req,res) => {
	Post.find({}).then((posts) => {
		res.status(200).json(posts);
	})	
});
router.get('/getUsers', (req,res) => {

	Post.find({}).then((posts) => {
		var arr = posts.map((item) => {
                        return item.name
                    });
		res.status(200).json(arr);
	})
		
});

router.get('/getUserEvent/:name', (req,res) => {

	Post.findOne({name:req.params.name}).then((user) => {
		if (user.event) {
			res.status(200).json(user.event);
		} else {
			res.status(400);
			res.end();
		}
		
	})
		
});

router.get('/createUser/:name', (req,res) => {

	Post.findOne({name:req.params.name}).then((user) => {

		if (!user) {
			let newUser = new Post({name:req.params.name});

			newUser.save().then( (user) => {
			res.status(201).json(user);
			})
			console.log('created new User!');

		} else {
			res.status(200).json(user);
		}
		
	})
	.catch(err => {console.log(err);res.status(400).json(err)})

});

router.post('/addEvent', (req,res) => {

	const newEvent = {
		"start":req.body.start,
		"duration": req.body.duration,
		"title": req.body.title
	};

	Post.updateOne({name:req.body.name}, {$push:{'event':newEvent}}, function(err, user){
        if(err){
            res.end();
        }
        else{

        	Post.findOne({name:req.body.name}).then((item) => {
        		console.log(item.event[item.event.length-1]);
				res.status(200).json(item.event[item.event.length-1]);
			});
        }
    });
});


router.post('/add', (req,res) => {
	console.log(req.files);

	fs.writeFile('./public/' + req.files.img.name, req.files.img.data, (err) => {
		if (err) {
		console.error(err)
		return
		}
		console.log(req.body);
		const postData = {
			"name":req.body.name,
			"description":req.body.description,
			"date": new Date(),
			"img": req.files.img.name
		};
		var post = new Post(postData);

		post.save().then( (post) => {
		res.status(201).json(post);
		})
		console.log('Saved!');
	});	
});

router.post('/edit', (req,res) => {

	Post.findById(req.body._id, function(err, post) {
	    if (err) {throw err;}
	     
	    post.title = req.body.title;
	    post.text = req.body.text;
	    
	    post.save(function(err) {
	        if (err) { throw err; }

	        console.log('Author updated successfully');
	        res.status(201).json(post);
	    });
	});	
});

router.post('/delete/:name', (req,res) => {

	Post.findOne({ name:req.params.name}).then((post) => {

		var doc = post.event.id({_id: req.body._id}).remove();
		
		post.save(function (err) {
		  if (err) {
		  	res.status(400).send("Bad req");
		  	return console.log(err)};
		  console.log('the sub-doc was removed')
		});

	})

	res.status(200).send("OK");
		
});

router.post('/upload', (req,res) => {



	// fs.appendFile(req.files["myFile"].name, req.files["myFile"].data, function (err) {
	// 	if (err) throw err;
	// 	console.log('Saved!');
	//   });

	fs.writeFile('./public/' + req.body.name+'.json', req.body.event, (err) => {
		if (err) {
		console.error(err)
		return
		}
		console.log('Saved!');
		
	});
	res.status(200).json({
		message: 'WELL!'
	})

});

module.exports = router;

