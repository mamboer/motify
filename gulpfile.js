var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    swig = require('gulp-swig'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    pkg = require('./package.json');


gulp.task('lint',function(){

    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));	

});

gulp.task('less',function(){

    return gulp.src('src/less/*.less')  // only compile the entry file
        .pipe(plumber())
        .pipe(less({
          paths: ['./']
        }))
        .pipe(prefix("last 8 version", "> 1%", "ie 8", "ie 7"), {cascade:true})
        .pipe(gulp.dest('src/css'))
        .pipe(livereload());  
    
});

gulp.task('css',function(){

    return gulp.src('src/css/*.css',{base:'src'})
        .pipe(csso())
        .pipe(gulp.dest('dist'));

});

gulp.task('watch', function() {
    gulp.watch('src/less/*.less', ['less','css']);  // Watch all the .less files, then run the less task
    gulp.watch('src/js/*.js',['lint']);
});


gulp.task('build', function() {

    var swigOpts = {

        data:pkg

    };

    gulp.src(['src/js/motify.js'])
        .pipe(swig(swigOpts))
        .pipe(rename('motify.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('site/dist/js'))
        .pipe(uglify({preserveComments:'some'}))
        .pipe(rename('motify.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('site/dist/js'));

    gulp.src('bower.swig')
        .pipe(swig(swigOpts))
        .pipe(rename('bower.json'))
        .pipe(gulp.dest(__dirname));
    
    gulp.src('index.swig')
        .pipe(swig(swigOpts))
        .pipe(gulp.dest('site'));    
    
    var siteFiles = ['package.json','dist/**'];
    gulp.src(siteFiles,{base:'.'})
        .pipe(gulp.dest('site'));

    gulp.src(['src/vendors/**'],{base:'src'})
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('site/dist'));


});

gulp.task('default',['lint','less','css','build','watch']);
