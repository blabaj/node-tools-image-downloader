var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));


var files   = [];
var data   = [];
var directory = "./output";
var movies = "bigData.json";
var index = 0;

fs.readdirAsync(directory).map(function (filename) {
    files.push(directory + "/" + filename);
    //return fs.readFileAsync(directory + "/" + filename, "utf8");
}).then(function () {
    //console.log(files);
   
    function doIt(){

        //console.log(i)
        var pr0mise = fs.readFileAsync(files[index],"utf8");
      
        pr0mise.then(function(str){
        	index++;
            //console.log(json);
            var json = JSON.parse(str);
          	
			      data.push(json)
  			    if(index === files.length){
  			    	//console.log(JSON.stringify(data));
  			    	fs.writeFile(movies, JSON.stringify(data), function(err) {
  					    if(err) {
  					        return console.log(err);
  					    }

  					    console.log("The file was saved!");
  					   }); 
  			    	return;	
  			    }
			    doIt()
			

        
        }).error(function(e){
            console.log(e);
        }).bind({})
    }
    doIt();


    
});