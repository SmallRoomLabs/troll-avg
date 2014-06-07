'use strict';
/*jslint node: true */

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');


gulp.task('test', function () {
  gulp.src('./test/*.js')
  .pipe(mocha({reporter: 'spec'}));
});


gulp.task('lint', function() {
  gulp.src(['./lib/*.js','./test/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish), {verbose: true});
});


gulp.task('default', ['lint','test']);
