'use strict';

const SRC = 'src';
const DEST = 'dist';
const PROJECT_NAME = 'miniToastr';
const TESTS_SRC = 'test';

const config = {
  SRC: SRC,
  dest: DEST,
  projectName: PROJECT_NAME,
  js: {
    src: [
      SRC + '/**/*.js'
    ]
  },
  tests: {
    src: [TESTS_SRC]
  }
};

module.exports = config;
