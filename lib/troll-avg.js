'use strict';
/*jslint node: true */

// var avgCount;
// var collectPeriod;
// var allowedValues={};
// var currData={};
// var data={};
// var slot=0;
// var lastSecond=0;
// var periodCnt=0;
// var partialCount=0;


//
// Initialize data collection
//
// _allowed - array of allowed keys
// _period  - number of seconds to collect data in each slot
// _count   - number of slots to average over
//
function Ave(_allowed, _period, _count) {
  var self=this;
  self.collectPeriod=_period;
  self.avgCount=_count;
  self.allowedValues={};
  var key;
  for (key in _allowed) {
    if (_allowed.hasOwnProperty(key)) {
      self.allowedValues[_allowed[key]]={};
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
  self.clearCurrData();

  self.slot=0;
  self.partialCount=0;
  self.lastSecond=new Date().getSeconds();
  self.periodCnt=self.collectPeriod;
  setInterval(self.timerUpdate,100);


  //
  // (Private)
  //
  self.timerUpdate=function () {
    var nowSecond=new Date().getSeconds();
    // Test if a full second has passed
    if (nowSecond!=self.lastSecond) {
      self.lastSecond=nowSecond;
      self.periodCnt--;
      // Have enough seconds passed?
      if (self.periodCnt===0) {
        // Yup, reset period counter...
        self.periodCnt=self.collectPeriod;
        // Transfer collected data to main array
        for (var key in self.allowedValues) {
          if (self.allowedValues.hasOwnProperty(key)) {
            self.data[key][self.slot]=self.currData[key];
          }
        }
        self.clearCurrData();
        // Point to next slot
        self.slot++;
        if (self.slot>=self.avgCount) {
          self.slot=0;
        }
        // Increment partialCount while not all slots have been filled...
        // ...so average calculations can be done correctly
        if (self.partialCount<self.avgCount) {
          self.partialCount++;
        }
      }
    }
  };

  //
  // (Private) Initialize working data array
  //
  self.clearCurrData=function () {
    for (var key in self.allowedValues) {
      if (self.allowedValues.hasOwnProperty(key)) {
        self.currData[key]=0.0;
      }
    }
  };


} // End of constructor




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
    // the average before all slots are filled
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
