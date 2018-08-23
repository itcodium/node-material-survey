var fs = require('fs')
var _ = require('underscore');

exports.getAll = function(req, res){
    fs.readFile('data/data.json', 'utf8', function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        
        var data_name;
        if(typeof req.query.name!='undefined' && req.query.name!=""){
            data_name=filterLike(data, "name", req.query.name);
        }else{
            data_name=data;
        }
        var stars=(typeof req.query.stars=='undefined' || req.query.stars.trim()=='' ) ?[]: req.query.stars.trim().split(",");
        var data_filter=[]
        if(stars.length>0) {
            for (i = 0; i <  stars.length; i++) {
                for (j = 0; j <  data_name.length; j++) {
                    if( stars[i]== data_name[j].stars){
                        data_filter.push(data_name[j]) 
                    } 
                }
            }
            
        }else{
            data_filter=data_name;
        }
        res.jsonp({
                    registros:chunkArray(data_filter,5)[2],
                    length: data_filter.length
                })
    });
}
        

function filterLike(data, field, value){
    var evens = _.filter(data, function(obj) {
        return ~obj[field].toLowerCase().indexOf(value.toLowerCase());
    });
    return evens;
}

function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        var myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }
    return tempArray;
}