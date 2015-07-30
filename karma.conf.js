'use strict';

module.exports = function(karma) {
  karma.set({

    basePath: '',

    frameworks: ['browserify', 'mocha'],

    files: [
      'test/**/*Spec.js'
    ],

    reporters: ['spec', 'clear-screen'],

    preprocessors: {
      'test/**/*.js': ['browserify'],
      'src/**/*.js': ['browserify']
    },

    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],

    // browserify configuration
    browserify: {
      debug: true,
      extensions: ['.js'],
      transform: ['babelify']
    }
  });
};
