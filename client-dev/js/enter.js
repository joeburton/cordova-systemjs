define('enter', [], () =>

    /**
     * just some setup
     * @return {undefined} void
    */
    function enter() {

        const activeFlag = document.querySelector('.active');

        if (window.cordova) {
            document.addEventListener('deviceready', () => {
                activeFlag.appendChild(document.createTextNode('cordova active'));
                activeFlag.classList.add('on');
            }, false);
        } else {
            activeFlag.appendChild(document.createTextNode('cordova inactive'));
            activeFlag.classList.add('off');
        }

    }

);
