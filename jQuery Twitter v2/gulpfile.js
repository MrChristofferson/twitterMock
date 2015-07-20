'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('rimraf');
// var jshint = require('gulp-jshint');

// Add your require statements and gulp tasks here

gulp.task('default', ['build', 'watch', 'serve'])

gulp.task('clean', function (cb) {
    clean('./dist/bundle.js', cb)
})

gulp.task('watch', function () {
  gulp.watch('js/index.js', ['build'])
})
 
// gulp.task('lint', function() {
//   return gulp.src('./js/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// Browserify
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var hbsfy = require('hbsfy');

var bundler = browserify({
  entries: ['./js/index.js'],
  debug: true
});

bundler.transform(hbsfy);
bundler.on('log', gutil.log); // output build logs to terminal

gulp.task('build', ['clean'], function () {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    // set output filename
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

// API Server
var jsonServer = require('json-server');
var apiServer = jsonServer.create();
var router = jsonServer.router('db.json');

apiServer.use(jsonServer.defaults);
apiServer.use(router);

gulp.task('serve:api', function (cb) {
  apiServer.listen(3000);
  cb();
});

// Web Server
var serve = require('gulp-serve');

gulp.task('serve:web', serve({
  root: ['.'],
  port: 8000
}));

gulp.task('serve', ['serve:api', 'serve:web'])
