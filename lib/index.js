"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// --- CONSTANTS ---
var ZERO_REGEX = /^0/;
var STRING_REGEX = /\s+/g;
var ONLY_STRING_REGEX = /^\s+|\s+$/g;
var UNICODE_REGEX = /[^\x00-\x80]/;
var HEX_REGEX = /^0x[0-9a-f]+$/i;
var NUMERIC_REGEX = /(0x[\da-fA-F]+|(^[\+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|\d+)/g;
var DATE_REGEX = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/; // tslint:disable-line
// --- UTILS ---
var toLowerCase = String.prototype.toLocaleLowerCase || String.prototype.toLowerCase;
// Normalize values
var normalize = function (s, i) {
    var v = i ? toLowerCase.call("" + s) : "" + s;
    return v.replace(ONLY_STRING_REGEX, '');
};
// Split numeric strings and default strings
var tokenize = function (s) {
    return s
        .replace(NUMERIC_REGEX, '\0$1\0')
        .replace(/\0$/, '')
        .replace(/^\0/, '')
        .split('\0');
};
// Normalize spaces
var parse = function (s, l) {
    // Find floats not starting with '0', strings or 0 if not defined (Clint Priest)
    return (((!s.match(ZERO_REGEX) || l === 1) && parseFloat(s)) ||
        s.replace(STRING_REGEX, ' ').replace(ONLY_STRING_REGEX, '') ||
        0);
};
function natsort(options) {
    if (options === void 0) { options = {}; }
    var desc = options.desc || false;
    var insensitive = options.insensitive || false;
    var EQUAL = 0;
    var GREATER = desc ? -1 : 1;
    var SMALLER = -GREATER;
    return function (a, b) {
        // Trim pre-post whitespace
        var aa = normalize(a, insensitive);
        var bb = normalize(b, insensitive);
        // Return immediately for empty values (empty < any others)
        if (!aa && !bb) {
            return EQUAL;
        }
        if (!aa && bb) {
            return SMALLER;
        }
        if (aa && !bb) {
            return GREATER;
        }
        // Tokenize values
        var aArr = tokenize(aa);
        var bArr = tokenize(bb);
        // Hex or date detection
        var aHex = aa.match(HEX_REGEX);
        var bHex = bb.match(HEX_REGEX);
        var av = aHex && bHex ? parseInt(aHex[0], 16) : aArr.length !== 1 && Date.parse(aa);
        var bv = aHex && bHex ? parseInt(bHex[0], 16) : (av && bb.match(DATE_REGEX) && Date.parse(bb)) || null;
        // Try and sort hex codes or dates
        if (bv) {
            if (av === bv) {
                return EQUAL;
            }
            if (av < bv) {
                return SMALLER;
            }
            if (av > bv) {
                return GREATER;
            }
        }
        // Array lengths
        var al = aArr.length;
        var bl = bArr.length;
        var ml = Math.max(al, bl);
        // Handle numeric strings and default strings
        for (var i = 0; i < ml; i += 1) {
            var af = parse(aArr[i] || '', al);
            var bf = parse(bArr[i] || '', bl);
            // Handle numeric vs string comparison (numeric < string)
            if (isNaN(af) !== isNaN(bf)) {
                return isNaN(af) ? GREATER : SMALLER;
            }
            // If unicode use locale comparison
            if (UNICODE_REGEX.test(af + bf) && af.localeCompare) {
                var comp = af.localeCompare(bf);
                if (comp > 0) {
                    return GREATER;
                }
                if (comp < 0) {
                    return SMALLER;
                }
                if (i === ml - 1) {
                    return EQUAL;
                }
            }
            if (af < bf) {
                return SMALLER;
            }
            if (af > bf) {
                return GREATER;
            }
            if ("" + af < "" + bf) {
                return SMALLER;
            }
            if ("" + af > "" + bf) {
                return GREATER;
            }
        }
        return EQUAL;
    };
}
exports.default = natsort;
