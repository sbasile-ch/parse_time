var units = {'s':1, 'm':2, 'h':3, 'd':4, 'mon':5, 'y':6};
var alt_units = Object.keys(units).sort().reverse().join("|"); // build alternation for regex (with 'mon' before 'm')

var modifiers = { 'now': mod_now }

var pattern_whole = new RegExp (`(\\w+)\\(\\)([^@]*)(@(${alt_units}))?`);
var pattern_delta = new RegExp (`([-+]\\d+)(${alt_units})(.*)`);


function mod_now() { return new Date() }

function parse_delta (text) {
    var delta = Object.keys(units).reduce((obj, val) => {
              return {...obj, [val]: 0};
        }, {});
    var val, unit;
    try {
    while (text) {
            console.log (`received -----x-----------${text}`);
            var r = text.match (pattern_delta);
            if (r) {
                var val = r[1], unit = r[2];
                text  = r[3];
                console.log (val)
                console.log (unit)
                console.log (text)
                delta[unit] += Number(val)
                console.log (delta)
            }
            else { throw `not proper delta value'${text}'` }
        }
    }
    catch (err) { console.log (err) }
    return delta
}

function apply_delta (date, delta, snap) {
    console.log (`received -----------------${date} and ${delta} ${snap}`);
    date.setUTCFullYear (date.getUTCFullYear() + delta.y);
    date.setUTCMonth    (units.mon < snap ? 0 : date.getUTCMonth()    + delta.mon);
    date.setUTCDate     (units.d   < snap ? 1 : date.getUTCDate()     + delta.d);
    date.setUTCHours    (units.h   < snap ? 0 : date.getUTCHours()    + delta.h);
    date.setUTCMinutes  (units.m   < snap ? 0 : date.getUTCMinutes()  + delta.m);
    date.setUTCSeconds  (units.s   < snap ? 0 : date.getUTCSeconds()  + delta.s);
}



function parse (text) {
    console.log (`received -----------------${text}`);
    var r = text.match (pattern_whole);
    if (r) {
        var modifier = r[1], delta_txt = r[2], x = r[3], snap = r[4];
        console.log (modifier)
        console.log (delta_txt)
        console.log (x)
        console.log (snap)
        var delta = parse_delta(delta_txt)
        var d = modifiers[modifier]();
        apply_delta (d, delta, units[snap]);
        console.log(d.toISOString());
    }
}


function main() {
    console.log (process.argv[2]);
    parse (process.argv[2]);
    console.log (units);
}
main();


