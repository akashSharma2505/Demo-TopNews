'use strict';
if (process.argv.indexOf('dist') !== -1) {
    process.argv.push('--ship')
}

const build = require('@microsoft/sp-build-web');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence')

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(require('gulp'));
gulp.task('dist', gulpSequence('clean', 'build', 'bundle', 'package-solution'))
