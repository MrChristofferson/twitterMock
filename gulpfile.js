
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rimraf = require('rimraf');


gulp.task('min', ['clean'], function () {
	return gulp.src('scripts/main.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/'))
});

gulp.task('clean', function (cb) {
    rimraf('./dist', cb);
});

gulp.task('default', ['min'], function() {
	console.log('hello')

});