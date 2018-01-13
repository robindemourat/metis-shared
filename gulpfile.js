const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat')

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('copy-scss', () => {
  return gulp
          .src([
            'src/**/*.scss',
            'src/**/**/*.scss',
            'src/**/**/**/*.scss',
            'src/**/**/**/**/*.scss'
            ])
          .pipe(gulp.dest('dist'))
});

gulp.task('transpile-scss', () => {
  return gulp
          .src([
            'src/**/*.scss',
            'src/**/**/*.scss',
            'src/**/**/**/*.scss',
            'src/**/**/**/**/*.scss'
            ])
          .pipe(sass().on('error', sass.logError))
          .pipe(concat('style.css'))
          .pipe(gulp.dest('dist'))
});

gulp.task('transpile-js', () => {
  return gulp
        .src([
        'src/*.js', 'src/**/*.js', 'src/**/**/*.js',
        '!src/*.spec.js', 
        '!src/**/*.spec.js', 
        '!src/**/**/*.spec.js',
        '!src/**/**/**/*.spec.js',
        '!src/**/**/**/*.spec.js'
        ])
        .pipe(babel({
            "plugins": [
              "transform-decorators-legacy",
              "transform-decorators",
              "transform-object-rest-spread",
              "transform-class-properties"
            ],
            "presets": [
              "es2015",
              "react"
            ]
          }
        ))
        // .pipe(uglify())
        .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series('clean', 'copy-scss', 'transpile-scss', 'transpile-js'));