'use strict';
/*jslint node: true */

var Troll=require('../lib/troll-avg');

// Setup 5 counting slots collectng for 1 second each for
// three different keys. This wil give the average values
// over the last 5 seconds.
var series1keys=['foo','bar','bletch'];
var series1=new Troll(series1keys, 1, 100);

// Increment a random key by 1 every 250 mS
setInterval(function() {
    var r=Math.random();
    if (r<0.1) {            // 10% goes to boo
        series1.update('foo',1);
    } else if (r<0.4) {     // 30% goes to bar
        series1.update('bar',1);
    } else {                // 60% goes to bletch
        series1.update('bletch',1);
    }
},250);

// Show all averages every second
setInterval(function() {
    console.log(series1.averages());
}, 1000);
