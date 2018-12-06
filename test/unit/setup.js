require('jsdom-global')();

const dbg = require('debug')('node-play-ui:unit-test');

const chai = require('chai');

global.expect = chai.expect;
global.dbg = dbg;
