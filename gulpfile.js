'use strict';
/*jslint node: true */

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulp   = require('gulp');
var mocha = require('gulp-mocha');


gulp.task('test', function () {
  gulp.src('./test/*.js')
  .pipe(mocha({reporter: 'spec'}));
});


gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});


gulp.task('default', ['lint', 'test']);
          