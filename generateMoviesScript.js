var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var fs2 = require('node-fs');
var request = require('request');


var file = "./data2015.json";



var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

var contents = fs.readFile(file, 'utf8');

fs.readFileAsync(file).then(JSON.parse).then(function (json) {
    console.log(json.length);
    var index = 0;
    //for (var i = json.length - 1; i >= 0; i--) {
    console.log(json[index].ID_Film);
   

    function getFile(){
    	 var url = 'http://webservice.cd-cc.si/liffe/2015/film.aspx?id=' + json[index].ID_Film;
    	 download(url, './xml/movie' + json[index].ID_Film + '.xml', function(e){
				//console.log('ok ' + e);
				index++;
				if(json.length === index)return;
				setTimeout(function(){ getFile();}, 1000);					  		
		});
    };

    getFile();

}).catch(SyntaxError, function (e) {
    console.error("file contains invalid json");
}).error(function (e) {
    console.error("unable to read file, because: ", e.message);
});


var createFolderIfMiss = function(dest, url, imgName, clb){
		if (!fs.existsSync(dest)){
				    fs2.mkdir(dest, 0777, true, function (err) {
					  if (err) {
					    console.log(err);
					  } else {			  
						clb();
					  }
					});
			}else{
					clb();
			}
}



