module.exports.Promise = function(fn) {
  var callback          = null;
  var progress_callback = null;

  this.then = function(cb, pg) {
    callback          = cb;
    progress_callback = pg;
  };

  function resolve(value) {
    callback(value);
  }

  function progress(value){
    console.log(progress_callback);
    progress_callback(value);
  }

  fn(resolve, progress);
};
