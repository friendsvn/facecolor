const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const fs = require('fs');
var preset = JSON.parse(fs.readFileSync('preset-table.json'));

var app = express();

var port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json({extended: true}));
app.use(bodyParser.text({type: '*/*'}));

app.post("/", (req, res) => {
	try {
		console.log("New connection on "+Date.now());
		request({
			url: 'https://www.facebook.com/react_composer/feedx_sprouts/bootload/?composer_id=rc.u_0_r&target_id=1&composer_type=feedx_sprouts&friend_list_id=&dpr=1',
			method: 'POST',
			headers: {
				'User-Agent': req.headers['user-agent'],
				'Cookie': req.headers['cookie']
			},
			body: req.body,
			strictSSL: false,
		}, (err, resp, body) => {
			if (err) {
				res.send({});
			}
			else {
				let json = JSON.parse(body.substr(9));
				json.jsmods.require[0][3][1].config.taggersConfig.FORMATTED_TEXT.textFormats=preset;
				res.send("for (;;);"+JSON.stringify(json));
				// res.send(body);
			}
		});
	} catch (e) {
		console.log(e);
	}
});

app.listen(port, () => {
	console.log("Listening on port "+port);
});