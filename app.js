var reader = require('reader.js');
var parser = require('parser.js');

var printAccount = function(account, valid){
  var output = "";
  account.forEach(function(number){
    output += number.output.toString();
  });

  valid = valid ? "" : "ERR";
  console.log(output, valid);
};

reader.file("document.txt", function(accounts){
  parser.process(accounts, printAccount);
});
