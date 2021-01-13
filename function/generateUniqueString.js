function generateUniqueString() {
    var ts = String(new Date().getTime()),
        i = 1,
        out = '';

    for (i = 1; i < ts.length; i += 3) {
        out += Number(ts.substr(i, 3)).toString(36);
    }

    return (out);
}

module.exports = generateUniqueString;
