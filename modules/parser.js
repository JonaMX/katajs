var patterns = [
   " _ " +
   "| |" +
   "|_|",
   "   " +
   "  |" +
   "  |",
   " _ " +
   " _|" +
   "|_ ",
   " _ " +
   " _|" +
   " _|",
   "   " +
   "|_|" +
   "  |",
   " _ " +
   "|_ " +
   " _|",
   " _ " +
   "|_ " +
   "|_|",
   " _ " +
   "  |" +
   "  |",
   " _ " +
   "|_|" +
   "|_|",
   " _ " +
   "|_|" +
   " _|"
];

var chars = [" ", "_", "|"];

module.exports = {
  account: function(account, cb){
    account.numbers.forEach(function(number){
      number.output = this.identify(number);

      if(number.output == '?'){
        account.status = "ILL";
        account.ill = account.ill ? account.ill + 1 : 1 ;
      }
    }.bind(this));

    cb(account);
  },

  identify: function(number){
    var output = "?";
    for(x = 0; x < patterns.length; x++){
      if(patterns[x] === number.ascii){
        output = x;
        x = patterns.length;
      }
    }
    return output;
  },

  guess: function(account, checkSum, cb){
    if(account.status === "ILL" && account.ill > 1){ return cb(account); }
    if(!account.options){ account.options = []; }

    //clone array
    var numbers = JSON.parse(JSON.stringify(account.numbers));
    var guessNum = null;
    var ascii = null;
    var option = null;

    numbers.forEach(function(number, index){
      ascii = number.ascii.split("");
      for(var x = 0; x < ascii.length; x++){
        if((account.status == "ILL" && number.output == "?") || account.status == "ERR"){
          chars.forEach(function(c){
            ascii[x] = c;
            guessNum = this.identify({ ascii: ascii.join("") });
            if(guessNum != "?"){
              numbers[index].output = guessNum;
              if(checkSum({ numbers: numbers })){
                account.options.push(numbers);
              }

              numbers = JSON.parse(JSON.stringify(account.numbers));
            }
            ascii[x] = account.numbers[index].ascii[x];
          }.bind(this));

        }
      }
    }.bind(this));

    if(account.options.length > 1){
      account.status = "AMB";
    }else{
      if(account.options.length === 1){
        account.numbers = account.options[0];
        account.status  = "";
      }
    }

    cb(account);
  }
};
