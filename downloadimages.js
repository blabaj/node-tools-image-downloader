var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var fs2 = require('node-fs');
var request = require('request');


var file = "./tmp/10_krog_Prve_lige_TS_216479.json";
var cheerio = require('cheerio');
var images = [];
var html = [];
var files = [];
var destFolder = './images';
var createFolder = '';
var directory = './output1';
var NR = 1;

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


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

var getImages = function(images){
			if(!images && images.length === 0 )return;
	//for (var i = images.length - 1; i >= 0; i--) {
			var index = 0;

			function getFiles(sorc,dest,clb){
		    	download(sorc, dest, function(e){
					  		//console.log('ok ' + e);
					  		index++;
					  		if(images.length === index)return;
					  		setTimeout(function(){ clb();}, 900);
					  		
				});
		    }
			function getName(){
				var url = images[index];
				var imgName = url.substr(url.lastIndexOf('/') + 1 , url.length);

				var createFolder = url.substr(25,11);

				var nrSlash = createFolder.split('/').length;
			    //console.log(nrSlash);
			    if(nrSlash === 4){
			    	createFolder = createFolder + '/';
			    }
			    if(nrSlash === 5){
			    	var test4 = createFolder.substr(createFolder.length -1 , createFolder.length);
			    	if(test4 !== '/'){
			    		createFolder = createFolder.substr(0, createFolder.length - 1);
			    	}
			    }

			    var dest = destFolder + createFolder;

			    createFolderIfMiss(dest, url, imgName, function(){
			    	console.log(dest);
			    	console.log(url);
			    	
			    	getFiles('http:' + url, dest + imgName, getName);
		    	}) 	
			}
			
			getName();
		    
		   

		    


			/*if (!fs.existsSync(dest)){
				    fs2.mkdir(dest, 0777, true, function (err) {
					  if (err) {
					    console.log(err);
					  } else {			  
					    download('http:' + url, dest + imgName, function(e){
					  		console.log('ok ' + e);
						});
					  }
					});
			}else{
					download('http:' + url, dest + imgName, function(e){
					  		console.log('ok ' + e);
					});
			}*/
		
			
			

		//};
}

fs.readdirAsync(directory).map(function (filename) {
    files.push(directory + "/" + filename);
    //return fs.readFileAsync(directory + "/" + filename, "utf8");
}).then(function () {
    //console.log(files);
    //for (var i = files.length - 1; i >= 0; i--) {
        //console.log(i)
        if(!files && files.length === 0) return;
        var iterator = 0;
	    
	    function doMagic(){
	        	var pr0mise = fs.readFileAsync(files[iterator],"utf8");

	        	pr0mise.then(function(contents){
	            //console.log(contents);
	            var data = JSON.parse(contents);
	           	//images[i] = [];
			    if(data.data.length > 0){
			    	for (var j = data.data.length - 1; j >= 0; j--) {
			    		var raw = data.data[j].content;
			    		var index = raw.indexOf('images.scribblelive.com') -2;
			    		if(index > 0){
			    			var end = raw.indexOf('.jpg',index) -1;
			    			var link = raw.substr(index,end);
			    			var test = link.substr(0,1);
			    			if(test === 'm'){
			    				link = '/' + link.substr(1,link.length);
			    			}
			    			var test2 = link.indexOf('.jpg')
			    			if(test2 !== -1){
			    				link = link.substr(0,test2 + 4);
			    			}
			    			
				   			var test3 = link.indexOf('.png')
				   			if(test3 !== -1){
			    				link = link.substr(0,test3 + 4);
			    			}
			    			if(link.length > 0){
			    				images.push(link);
			    				
			    				NR++;
			    				//console.log(link);
			    			}
			    			
			    		
			    		}
			    		
			    	};
			    }
			    	   
			  	getImages(images);
			  	console.log('File: ' + iterator);
			  	console.log('Images: ' + NR);
			  	iterator++;
			  	var time = NR * 10;
			  	NR = 1;

			  	if(iterator === files.length)return;

			  	setTimeout(function(){
			  			doMagic();	
			  	},1000 * time);
			  	

			  	
	            //console.log(output);
	        }).error(function(e){
	            console.log(e);
	        }).bind({})

        }
        
        
      doMagic();
       
    //};
});
/*
return;


fs.readFile(file, 'utf8', function(err, contents) {
   
    var data = JSON.parse(contents);

    if(data.data.length > 0){
    	for (var i = data.data.length - 1; i >= 0; i--) {
    		var raw = data.data[i].content;
    		var index = raw.indexOf('images.scribblelive.com') -2;
    		if(index > 0){
    			var end = raw.indexOf('.jpg',index) -1;
    			var link = raw.substr(index,end);
    			images.push(link);
    			createFolder = link.substr(25,11);
    		}
    		
    	};
    }
  	var dest = destFolder + createFolder;
	if (!fs.existsSync(dest)){
	    fs2.mkdir(dest, 0777, true, function (err) {
		  if (err) {
		    console.log(err);
		  } else {
		  	getImages(images,dest)
		    console.log('Directory ' + destFolder + createFolder + ' created.');
		  }
		});
	}else{
		
		getImages(images,dest)

	}
	

})

*/