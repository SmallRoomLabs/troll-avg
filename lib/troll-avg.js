'use strict';
/*jslint node: true */

// var avgCount;
// var collectPeriod;
// var allowedValues={};
// var currData={};
// var data={};
// var bin=0;
// var lastSecond=0;
// var periodCnt=0;
// var partialCount=0;


//
// Initialize data collection
//
// allowedKeys - array of allowed keys
// period  - number of seconds to collect data in each bin
// binCount   - number of bins to average over
//
function Ave(allowedKeys, period, binCount) {
  var self=this;
  self.collectPeriod=period;
  self.avgCount=binCount;
  self.allowedValues={};
  var key;
  for (key in allowedKeys) {
    if (allowedKeys.hasOwnProperty(key)) {
      self.allowedValues[allowedKeys[key]]={};
    }
  }
  // Init data array
  self.data={};
  for (key in self.allowedValues) {
    if (self.allowedValues.hasOwnProperty(key)) {
      self.data[key]={};
      for (var i=0; i<self.avgCount; i++) {
        self.data[key][i]=0.0;
      }
    }
  }
  self.currData={};
  self._clearCurrData();

  self.bin=0;
  self.partialCount=0;
  self.lastSecond=new Date().getSeconds();
  self.periodCnt=self.collectPeriod;
  setInterval(function(){self._timerUpdate();},100);




} // End of constructor



//
// (Private)
//
Ave.prototype._timerUpdate=function () {
  var nowSecond=new Date().getSeconds();
  // Test if a full second has passed
  if (nowSecond!=this.lastSecond) {
    this.lastSecond=nowSecond;
    this.periodCnt--;
    // Have enough seconds passed?
    if (this.periodCnt===0) {
      // Yup, reset period counter...
      this.periodCnt=this.collectPeriod;
      // Transfer collected data to main array
      for (var key in this.allowedValues) {
        if (this.allowedValues.hasOwnProperty(key)) {
          this.data[key][this.bin]=this.currData[key];
        }
      }
      this._clearCurrData();
      // Point to next bin
      this.bin++;
      if (this.bin>=this.avgCount) {
        this.bin=0;
      }
      // Increment partialCount while not all bins have been filled...
      // ...so average calculations can be done correctly
      if (this.partialCount<this.avgCount) {
        this.partialCount++;
      }
    }
  }
};



//
// (Private) Initialize working data array
//
Ave.prototype._clearCurrData=function () {
  for (var key in this.allowedValues) {
    if (this.allowedValues.hasOwnProperty(key)) {
      this.currData[key]=0.0;
    }
  }
};




//
// Increment the data in the specified key.
//
// key  - One of the allowed keys
// cnt  - how much to increment, if unspecified increment by 1
//
Ave.prototype.update=function(key, cnt) {
  if (typeof cnt==='undefined') {
    cnt=1;
  }
  this.currData[key]=this.currData[key]+cnt;
};



//
// Calculate the average for the specified key
//
Ave.prototype.average=function(key) {
    var sum=0;
    for (var i=0; i<this.avgCount; i++) {
      sum=sum+this.data[key][i];
    }
    // Use partialCount instead of avgCount to correctly calculate
    // the average before all bins are filled
    var avg=0;
    if (this.partialCount>0) {
      avg=sum/this.partialCount;
    }
    return avg;
};




//
// Calculate the averages and return as an object
//
Ave.prototype.averages=function () {
  var results={};
  for (var key in this.allowedValues) {
    if (this.allowedValues.hasOwnProperty(key)) {
      results[key]=this.average(key);
    }
  }
  return results;
};



module.exports=Ave;
