define('main', ['./enter.js'], (enter) => {

    const main = {

        domStatus: 'loading', // domStatus should equal loading whilst dom is not ready and complete when ready

        /**
        * bind setInterval to call startApp until DOM ready
        * @param {function} callback function to execute after x seconds
        * @param {number} milliseconds between repeat
        * @return {String} value of domStatus
        */
        start() {

            this.checkDom = setInterval(() => this.startApp(), 250);

            return this.domStatus;

        },

        /**
         *  check to see if the DOM has loaded
         * @return {undefined} void
        */
        startApp () {

            if (/complete/i.test(document.readyState)) {
                this.domStatus = document.readyState;
                clearInterval(this.checkDom);

                // start app
                enter();
            }

            return this.domStatus;

        }

    };

    return main;

});
