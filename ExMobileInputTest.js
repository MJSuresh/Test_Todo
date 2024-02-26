function mobile_submit(mobileInput, mobileError) {
    mobileInput = mobileInput.replace(/[^0-9]/g, "");
    if (mobileInput != '1234567890') {
        if (mobileInput == '') {
            mobileError.textContent = '*This field is required';
        } else if (mobileInput.length < 10) {
            mobileError.textContent = '*Required 10 numbers';
        } else {
            mobileError.textContent = '*Mobile number does not exist';
        }
    } else {
        mobileError.textContent = '';
    }
};

module.exports = mobile_submit;