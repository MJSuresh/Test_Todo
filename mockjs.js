function checking_login_called(value, callback) {
    if (value == "123") {
        callback(true);
    }
}

module.exports = checking_login_called;