var Promise = require("bluebird");
var ExcellentExport = require("./excellentExportNode");
var fs = Promise.promisifyAll(require("fs"));
var cheerio = require('cheerio');

var files   = [];
var directory = "files";

fs.readdirAsync(directory).map(function (filename) {
    files.push(directory + "/" + filename);
    //return fs.readFileAsync(directory + "/" + filename, "utf8");
}).then(function () {
    //console.log(files);
    for (var i = files.length - 1; i >= 0; i--) {
        //console.log(i)
        var pr0mise = fs.readFileAsync(files[i],"utf8");
      
        pr0mise.then(function(content){
            console.log(this);
            var output = content.replace(/'/g, "\\'");
            $ = cheerio.load(output,{
                normalizeWhitespace: true,
            });
            $("thead").each(function() {
        
                $1 = $(this).find('tr').find('th');
                $1.each(function() {
                    //console.log($(this).html());
                }) 
            // compare id to what you want
            });
            //c
            //console.log(output);
        },i).error(function(e){
            console.log(e);
        }).bind({})
    };
});

return;

fs.readdirAsync(directory).map(function (filename) {
	//files.push(directory + "/" + filename);
    return fs.readFileAsync(directory + "/" + filename, "utf8");
}).then(function (content) {
    //console.log("so this is what we got: ", content)
    //content = content.replace('\'', '');
    console.log('s');
    return;
    var output = content[0].replace(/'/g, "\\'");
    //return;
	$ = cheerio.load(content[0],{
	    normalizeWhitespace: true,
	});

	$("thead").each(function() {
    	
    		$1 = $(this).find('tr').find('th');
    		$1.each(function() {
    			console.log($(this).html());
    		})
    	
    	// compare id to what you want
	});
	//ExcellentExport($);
	//$.html();
    console.log('s');
});



