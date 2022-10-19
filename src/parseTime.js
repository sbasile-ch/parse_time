module.exports = {parse, init_test};

var units = {'s':1, 'm':2, 'h':3, 'd':4, 'mon':5, 'y':6};
var alt_units = Object.keys(units).sort().reverse().join("|"); // build alternation for regex (with 'mon' before 'm')

var modifiers = { 'now': mod_now }  // extend here the grammar for new modifiers

var pattern_whole = new RegExp (`(\\w+)\\(\\)([^@]*)(@(${alt_units}))?`);
var pattern_delta = new RegExp (`([-+]\\d+)(${alt_units})(.*)`);
var test_now_date;

function mod_now()      { return new Date() }
function mod_now_test() { return new Date(test_now_date) }
function init_test(now) { test_now_date = now; modifiers.now = mod_now_test }

function snap (text, n) {
    if (n == undefined) { n = 0 }
    var pattern_snap = new RegExp (`(.+)(([-T:\.]\\d+){${n},${n}})Z`);
    var r = text.match (pattern_snap);
    if (r) {
            var head = r[1], to_snap = r[2];
            text = `${head}${to_snap.replace (/\d/g, 0)}Z`
    }
    return text
}

function parse_delta (text) {
    var delta = Object.keys(units).reduce((obj, val) => {
              return {...obj, [val]: 0};
        }, {});
    var val, unit;
    try {
        while (text) {
                var r = text.match (pattern_delta);
                if (r) {
                    var val = r[1], unit = r[2];
                    text  = r[3];
                    delta[unit] += Number(val)
                }
                else { throw new Error(`Invalid delta section'${text}'`) }
            }
    }
    catch (err) { throw (err) }
    return delta
}

function apply_delta (date, delta, n_snap) {
    date.setUTCFullYear (date.getUTCFullYear() + delta.y);
    date.setUTCMonth    (date.getUTCMonth()    + delta.mon);
    date.setUTCDate     (date.getUTCDate()     + delta.d);
    date.setUTCHours    (date.getUTCHours()    + delta.h);
    date.setUTCMinutes  (date.getUTCMinutes()  + delta.m);
    date.setUTCSeconds  (date.getUTCSeconds()  + delta.s);
    return snap (date.toISOString(), n_snap);
}

function parse (text) {
    try {
        var r = text.match (pattern_whole);
        if (r) {
            var modifier = r[1], delta_txt = r[2], x = r[3], snap = r[4];
            var delta = parse_delta(delta_txt)
            var d = modifiers[modifier]();
            return apply_delta (d, delta, units[snap]);
        }
        else { throw new Error(`Invalid input format:'${text}'`) }
    }
    catch (err) { console.log (err.message); return undefined}
}

function main() {
    var utc_str = parse (process.argv[2]);
    utc_str != undefined && console.log (utc_str);
}

main();
