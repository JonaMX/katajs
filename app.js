var reader        = require('./modules/reader.js');
var accountNumber = require('./modules/accountNumber.js');

var args          = process.argv.slice(2);

var printAccount = function(account){
  var output = "";
  account.numbers.forEach(function(number){
    output += number.output.toString();
  });

  console.log(output, account.status);
};


//var done     = function(value){ console.log("DONE", done); };
//var error    = function(value){ console.log("ERROR", error); };
//var progress = function(value){ console.log("PROGRESS", progress); };

reader.file(args[0], function(accounts){
  accountNumber.verify(accounts, printAccount);// function(value){ console.log(value); });
  //var promise = accountNumber.verify(accounts);

  //promise.then(function(value){
    //console.log("DONE", value);
  //}, function(value){
    //console.log("PROGRESS", value);
  //});
});
