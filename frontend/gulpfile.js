'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var concat = require('gulp-concat');

var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');

var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');

var browserSync = require('browser-sync').create();

var utils = require('gulp-util');
var isProduction = utils.env.type === "prod";

var errorHandler = {
    errorHandler: notify.onError({
        title: 'Ошибка в плагине <%= error.plugin %>',
        message: "Ошибка: <%= error.message %>"
    })
};

gulp.task('sass', function(){
    gulp.src('./assets/sass/**/*.scss')
        .pipe(plumber(errorHandler))
        .pipe(!isProduction ? sourcemaps.init() : utils.noop())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
        .pipe(isProduction ? minifyCss({compatibility: 'ie8'}) : utils.noop())
        .pipe(!isProduction ? sourcemaps.write() : utils.noop())
        .pipe(gulp.dest('./web/css'));
});

gulp.task('js', function() {
    gulp.src([
        './assets/js/main.js',
        './assets/js/**/*.js'
    ])
        .pipe(plumber(errorHandler))
        .pipe(ngAnnotate())
        .pipe(isProduction ? uglify() : utils.noop())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./web/js/'));
});

gulp.task('vendor:js', function () {
    var mainFiles = mainBowerFiles({
        paths: {
            bowerDirectory: 'bower_components'
        }
    });
    gulp.src(mainFiles)
        .pipe(plumber(errorHandler))
        .pipe(gulpFilter('**/*.js'))
        .pipe(concat('vendor.min.js'))
        .pipe(isProduction ? uglify() : utils.noop())
        .pipe(gulp.dest('./web/js/'));
});

gulp.task('vendor:css', function () {
    var mainFiles = mainBowerFiles({
        paths: {
            bowerDirectory: 'bower_components'
        }
    });
    mainFiles.push(__dirname + "/bower_components/bootstrap/dist/css/bootstrap.min.css");
    mainFiles.push(__dirname + "/bower_components/bootstrap/dist/css/bootstrap-theme.min.css");
    gulp.src(mainFiles)
        .pipe(plumber(errorHandler))
        .pipe(gulpFilter('**/*.css'))
        .pipe(concat('vendor.min.css'))
        .pipe(isProduction ? minifyCss({compatibility: 'ie8'}) : utils.noop())
        .pipe(gulp.dest('./web/css/'));
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);

gulp.task('template', function () {
    return gulp.src('./web/templates/**/*.html')
        .pipe(plumber(errorHandler))
        .pipe(templateCache("templates.min.js",{
            root: '/templates/'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./web/js'));
});

gulp.task('compiler', [
    'vendor',
    'template',
    'sass',
    'js'
]);

gulp.task('watch', ['compiler'], function(){
    browserSync.init({
        host: 'http://demo.socialquantum.dev',
        online: false,
        scriptPath: function (path, port, options) {
            return options.getIn(['urls', 'local']) + "/browser-sync/browser-sync-client.js";
        },
        files: [
            'web/js/templates.min.js',
            'web/js/main.min.js',
            'web/js/vendor.min.js',
            'web/css/main.min.css',
            'web/css/vendor.min.css',
            'web/index.html'
        ]
    });
    gulp.watch('./web/templates/**/*.html',['template']);
    gulp.watch('./bower.json',['vendor']);
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/js/**/*.js', ['js']);
});

gulp.task('default', function(){
    if(isProduction){
        console.log("Run in production mode!");
        gulp.start('compiler');
    }
    else{
        gulp.start('watch');
    }
});
