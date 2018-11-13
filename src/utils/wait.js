

module.exports = {

    forMs(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }
}