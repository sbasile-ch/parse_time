# parse time

## Specs

![Specs](https://github.com/sbasile-ch/parse_time/blob/master/specs/specs.png "Specs")

## Implementations

### Python
[parseTime.py](https://github.com/sbasile-ch/parse_time/blob/master/parseTime.py) is a first (partial) Python implementation. It was stopped as soon as realising that [datetime](https://docs.python.org/3/library/datetime.html) does not support deltas with `years` and `months`. As per  requirements the usage of an external libraries (like [module dateutil](https://github.com/dateutil/dateutil/blob/master/src/dateutil/relativedelta.py)) was discouraged and implementing the same from scratch, apart from the needed time, was quite pointless having instead JS & node the same feature available out of the box with [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

### JS / node
[parseTime.js](https://github.com/sbasile-ch/parse_time/blob/master/src/parseTime.js) starts matching [parseTime.py](https://github.com/sbasile-ch/parse_time/blob/master/parseTime.py) and then adds the missing code, relying on the support provided by [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

#### Usage:
```
❯ node parseTime.js 'now()+1y+1y+4y-5y+666d-7566m+55s-1s+45mon-1234s+7d'
2029-05-09T14:38:18.244Z

❯ node parseTime.js 'now()+1y+1y+4y-5y+666d-7566m+55s-1s+45mon-1234s+7d@d'
2029-05-14T00:00:00.904Z
```

### Unit tests
![Unit tests](https://github.com/sbasile-ch/parse_time/blob/master/specs/unit_tests.png "Unit tests")
