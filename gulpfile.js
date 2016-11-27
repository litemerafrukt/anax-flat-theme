var gulp = require('gulp');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');

gulp.task('hello', function() {
    console.log('Hello dbwebb');
});

gulp.task('watch', function(){

    gulp.watch('**/*.less', function(e) {
        // Do run some gulp tasks here
        // ...

        var child = spawn('make', ['less-install'], {cwd: process.cwd()}),
            stdout = '',
            stderr = '';

        child.stdout.setEncoding('utf8');

        child.stdout.on('data', function (data) {
            stdout += data;
            gutil.log(data);
        });

        child.stderr.setEncoding('utf8');
        child.stderr.on('data', function (data) {
            stderr += data;
            gutil.log(gutil.colors.red(data));
            gutil.beep();
        });

        child.on('close', function(code) {
            gutil.log('Done with exit code', code);
            // gutil.log('You access complete stdout and stderr from here'); // stdout, stderr
        });
    });
});
