var patterns = [
  [ " _ " +
    "| |" +
    "|_|" ]
  //{ ascii: [[" ", "_", " "],["|", " ", "|"],["|", "_", "|"]] }, //0
  //{ ascii: [[" ", " ", " "],[" ", " ", "|"],[" ", " ", "|"]] }, //1
  //{ ascii: [[" ", "_", " "],[" ", "_", "|"],["|", "_", " "]] }, //2
  //{ ascii: [[" ", "_", " "],[" ", "_", "|"],[" ", "_", "|"]] }, //3
  //{ ascii: [[" ", " ", " "],["|", "_", "|"],[" ", " ", "|"]] }, //4
  //{ ascii: [[" ", "_", " "],["|", "_", " "],[" ", "_", "|"]] }, //5
  //{ ascii: [[" ", "_", " "],["|", "_", " "],["|", "_", "|"]] }, //6
  //{ ascii: [[" ", "_", " "],[" ", " ", "|"],[" ", " ", "|"]] }, //7
  //{ ascii: [[" ", "_", " "],["|", "_", "|"],["|", "_", "|"]] }, //8
  //{ ascii: [[" ", "_", " "],["|", "_", "|"],[" ", "_", "|"]] }  //9
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
      if(JSON.stringify(patterns[x].ascii) === JSON.stringify(number.ascii)){
        output = x;
        x = patterns.length;
      }
    }
    return output;
  },

  guess: function(account, verify, cb){
    if(account.status === "ILL" && account.ill > 1){ return cb(account); }

    //clone array
    var numbers = account.numbers.slice(0);
    var guessNum = null;

    numbers.forEach(function(number, index){
      //var ascii = numbers[index].slice(0);
      number.ascii.forEach(function(ascii, idx){
        if(account.status == "ILL" && number.output == "?"){
          console.log("ENTRO", ascii);
          chars.forEach(function(c){
            ascii = c;
            guessNum = this.identify(number)
            if(guessNum != "?"){
              console.log("posible opcion", guessNum);
            }else{
              ascii = account.numbers[index].ascii[idx];
            }
          }.bind(this));
        }


            //var option = { numbers: numbers };


          //if(verify({ numbers: numbers })){
            //if(account.options){ account.options = []; }
            //account.options.push(numbers)
          //}

      }.bind(this));

      //number.output = this.identify(number);

      //if(number.output == '?'){
        //account.status = "ILL";
        //account.ill = account.ill ? account.ill + 1 : 1 ;
      //}
    }.bind(this));

    cb(account);
  }
};
