#!/usr/bin/env python3

import sys
import re
from datetime import datetime, timezone, timedelta

delta_zero    = {'s':0, 'm':0, 'h':0, 'd':0, 'mon':0, 'y':0}
units         = set(list(delta_zero))
alt_units     = '|'.join (sorted(units, reverse=True))  # build alternation for regex (with 'mon' before 'm')
pattern_whole = re.compile (fr"(\w+)\(\)([^@]*)(@({alt_units}))?")
pattern_delta = re.compile (fr"([-+]\d+)({alt_units})(.*)")

def _now():
    return datetime.now (timezone.utc)

modifiers = { 'now': _now, }

def parse_delta(text):
    global pattern_delta, delta_zero
    delta = delta_zero.copy()

    while text:
        m = pattern_delta.match (text)
        if m:
            val, unit, text = m.group(1, 2, 3)
            delta[unit] += int(val)

    return delta



def parse(text):
    global pattern_whole
    m = pattern_whole.match (text)
    if m:
        modifier, delta_txt, _, snap = m.group(1, 2, 3, 4)
        delta = parse_delta (delta_txt)
        t = modifiers [modifier]() + timedelta (days=delta['d'], seconds=delta['s'], minutes=delta['m'], hours=delta['h'])

def main():
   parse (sys.argv[1])

if __name__ == '__main__':
    main()
