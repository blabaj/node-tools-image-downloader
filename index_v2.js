var Promise = require("bluebird");
var ExcellentExport = require("./excellentExportNode");
var fs = Promise.promisifyAll(require("fs"));
var cheerio = require('cheerio');

var files   = [];
var directory = "files";

fs.readdirAsync(directory).map(function (filename) {
    files.push(directory + "/" + filename);
    return fs.readFileAsync(directory + "/" + filename, "utf8");
}).then(function (content) {
    //console.log(content.length);
   	 
   	for (var i = 0; i < content.length; i++) {
   			//console.log('... ' + files[i]);	
            var imeDatoteke = files[i];
            var zadnjiPodcrtaj = imeDatoteke.lastIndexOf("_") + 1; 
            var velikost = imeDatoteke.length - 4;
            var id_clanka = imeDatoteke.substring(zadnjiPodcrtaj, velikost);

            console.log(id_clanka);

   			var jsonfile = 	imeDatoteke.replace(/.xls/g, ".json");	
   			jsonfile = jsonfile.replace(/files/g, "output");	
   			//console.log(jsonfile);		
   			var output = content[i].replace(/'/g, "\\'");
            $ = cheerio.load(output,{
                normalizeWhitespace: true,
            });
            var threads = [];
            var sifrant =  ['creator','date','approved','content']
            var thread = {};
            /*$("thead").each(function() {
        
                $1 = $(this).find('tr').find('th');
                $1.each(function() {

                    console.log($(this).html());
                })            
            });*/
            $("tbody").each(function() {
        
                $1 = $(this).find('tr').find('td');

                $1.each(function(i, elem) {        	          
                    thread[sifrant[i%4]]= $(this).html();
                    if(i === 3){
                    	threads.push(thread);
                    	thread = {};
                    };
                 	if(i%4 === 0 && i > 0 && i !== 4){
                    	threads.push(thread);
                    	thread = {};
                    }               
                })            
            });
            var out = {};
            out.id = id_clanka;
            out.filename = imeDatoteke;
            out.data = threads;

            fs.writeFile(jsonfile, JSON.stringify(out, null, '\t'));

            //console.log(pr0mise)
   	};		
});






