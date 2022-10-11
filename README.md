# parse time

## Specs

![Specs](https://github.com/sbasile-ch/parse_time/specs/specs.png "Specs")

## Implememntations

### Python
![parseTime.py](https://github.com/sbasile-ch/parse_time/blob/master/parseTime.py "parseTime.py") is a first (partial) Python implementation. It was stopped as soon as realising that `datetime` does not support deltas with `years` and `months`. As per  requirements the usage of an external library (like ![module dateutil](https://github.com/dateutil/dateutil/blob/master/src/dateutil/relativedelta.py "module dateutil") was discouraged and implememting the same from scratch, apart from the needed time, was pointless having instead JS / node the same feature available out of th box with ![Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date "Date")

### JS / node
![parseTime.js](https://github.com/sbasile-ch/parse_time/blob/master/parseTime.js "parseTime.js") it starts matching ![parseTime.py](https://github.com/sbasile-ch/parse_time/blob/master/parseTime.py "parseTime.py") and adds the missing code relying on the support provided by ![Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date "Date")
