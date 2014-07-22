var reader = require('reader.js');
var parser = require('parser.js');

var printAccounts = function(accounts){ console.log(accounts); };

reader.file("document.txt", function(accounts){
  parser(accounts, printAccounts);
});
