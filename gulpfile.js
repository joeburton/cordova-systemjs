/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
'use strict';

const gulp = require('gulp');
const clear = require('clear');
const del = require('del');
const replace = require('gulp-replace');
const debug = require('gulp-debug');
const cleancss = require('gulp-clean-css');
const base64 = require('gulp-base64');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const runSequence = require('run-sequence');
const gulpIf = require('gulp-if');
const eslint = require('gulp-eslint');
const systemjsBuilder = require('gulp-systemjs-builder');
const gulpRemoveHtml = require('gulp-remove-html');
const babel = require('gulp-babel');


gulp.task('clean', (done) => {
    clear();
    del('dist');
    return cache.clearAll(done);
});


gulp.task('lint', () => {

    const ret = gulp.src(['client-dev/js/*.js', 'server/**/*.js', 'features/**/*.js', 'server.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

    return ret;
});


gulp.task('js', () => {

    const builder = systemjsBuilder();

    builder.loadConfigSync('./client-dev/js/config-prod.js');

    return builder.buildStatic('app.js', {
        globalName: 'triangleapp',
        minify: false,
        mangle: false
    }).pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('www/js'));
});


gulp.task('css', () => {

    const ret = gulp.src('client-dev/css/*.css')
        .pipe(cleancss())
        .pipe(base64())
        .pipe(gulp.dest('www/css'));

    return ret;
});


gulp.task('images', () => {

    const ret = gulp.src(['client-dev/img/**/*.+(png|jpg|jpeg|gif|svg)'])
        .pipe(debug({
            title: '>>>:'
        }))
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true
        })))
        .pipe(gulp.dest('www/img'));

    return ret;
});


gulp.task('html', () => {

    const ret = gulp.src(['client-dev/index.html'])
        .pipe(replace('/client-dev/js/config-dev.js', '/www/js/main.js'))
        .pipe(replace('/client-dev/css/styles.css', '/www/css/styles.css'))
        .pipe(gulpRemoveHtml())
        .pipe(gulp.dest('www'));

    return ret;
});


gulp.task('default', ['clean'], () => {

    gulp.start('build');
    gulp.watch('client-dev/**/*.*', ['build']);
});


gulp.task('build', (done) => {

    runSequence(
        // 'lint',
        'js',
        'css',
        'images',
        'html',
        done
    );
});

