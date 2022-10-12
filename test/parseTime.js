var expect = require("chai").expect;
var ps     = require("../src/parseTime.js");
var t = 1
const now = '2022-10-11T12:13:14.015';

ps.init_test(now);

console.log(`----- testing with now = ${now}`)

describe("test parse()", () => {
  describe(`test ${t++}`, () => {
    const input = 'now()+1d';
    const output = '2022-10-12T11:13:14.015Z';
    it(`${input} --> ${output}`, () => {
      expect(ps.parse(input)).to.equal(output);
    });
  });

  describe(`test ${t++}`, () => {
    const input = 'now()-1d';
    const output = '2022-10-10T11:13:14.015Z';
    it(`${input} --> ${output}`, () => {
      expect(ps.parse(input)).to.equal(output);
    });
  });

  describe(`test ${t++}`, () => {
    const input = 'now()@d';
    const output = '2022-10-11T00:00:00.000Z';
    it(`${input} --> ${output}`, () => {
      expect(ps.parse(input)).to.equal(output);
    });
  });

  describe(`test ${t++}`, () => {
    const input = 'now()-1y@mon';
    const output = '2021-10-00T00:00:00.000Z';
    it(`${input} --> ${output}`, () => {
      expect(ps.parse(input)).to.equal(output);
    });
  });

  describe(`test ${t++}`, () => {
    const input = 'now()+10d+12h';
    const output = '2022-10-21T23:13:14.015Z';
    it(`${input} --> ${output}`, () => {
      expect(ps.parse(input)).to.equal(output);
    });
  });

  describe(`test ${t++}`, () => {
    const input = 'now()+1y+1y+4y-5y+666d-7566m+55s-1s+45mon';
    const output = '2029-05-02T05:08:08.015Z';
    it(`${input} --> ${output}`, () => {
      expect(ps.parse(input)).to.equal(output);
    });
  });

  describe(`test ${t++}`, () => {
    const input = 'now(-10y@y';
    it(`${input} --> undefined`, () => {
      expect(ps.parse(input)).to.equal(undefined);
    });
  });

  describe(`test ${t++}`, () => {
    const input = 'now()-10yddddd@mon';
    it(`${input} --> undefined`, () => {
      expect(ps.parse(input)).to.equal(undefined);
    });
  });
});
