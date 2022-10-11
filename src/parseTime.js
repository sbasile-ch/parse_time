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

function apply_delta (date, delta, snap) {
    date.setUTCFullYear (date.getUTCFullYear() + delta.y);
    date.setUTCMonth    (units.mon < snap ? 0 : date.getUTCMonth()    + delta.mon);
    date.setUTCDate     (units.d   < snap ? 1 : date.getUTCDate()     + delta.d);
    date.setUTCHours    (units.h   < snap ? 0 : date.getUTCHours()    + delta.h);
    date.setUTCMinutes  (units.m   < snap ? 0 : date.getUTCMinutes()  + delta.m);
    date.setUTCSeconds  (units.s   < snap ? 0 : date.getUTCSeconds()  + delta.s);
}

function parse (text) {
    try {
        var r = text.match (pattern_whole);
        if (r) {
            var modifier = r[1], delta_txt = r[2], x = r[3], snap = r[4];
            var delta = parse_delta(delta_txt)
            var d = modifiers[modifier]();
            apply_delta (d, delta, units[snap]);
            return d.toISOString().replace(/\.\d+Z$/ig, 'Z');
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
