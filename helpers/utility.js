module.exports = {
    cleanString: function (input, pattern) {
        let dirtyPattern = /[^a-zA-Z0-9\?\&\=\'\"]?/g
        if (pattern != undefined) {
            dirtyPattern = pattern;
        }

        return input.replace(dirtyPattern);
    }
}