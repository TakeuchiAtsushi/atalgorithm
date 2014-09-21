var csv = require('ya-csv');
//MysqlÇ∆ÇÃê⁄ë±
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	database: 'test',
	user: 'root',
	password: 'root'
});

var i = 0;
var ai = new Array();

// equivalent of csv.createCsvFileReader('./seiza1_temp0.csv') 
var reader = csv.createCsvFileReader('./seiza1_temp0.csv', {
    'separator': ',',
    'quote': '"',
    'escape': '"',
    'comment': '',
});
var writer = new csv.CsvWriter(process.stdout);


function csv_insert(callback){
    reader.addListener('data', function (data) {
          if(i < 4){
          ai.push(data[0]);
          if(i > 0) console.log(ai[i]);
          
          }
          i++;
    });
    setTimeout(function(){
    callback();
    },1000);
};

csv_insert(function(){
    connection.query('INSERT INTO frequent_word(user_id,frequent_word1,frequent_word2,frequent_word3) VALUE(?,?,?,?)',['aaaaaaaaaa',ai[1],ai[2],ai[3]],function(){return;});
//    console.log(ai[1]);
});
