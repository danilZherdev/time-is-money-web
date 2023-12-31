function redirectConfig() {
    var queryString = {},
        browserMovedToBackground = false,
        IOSAppIsInstalled = false;

    (function (search) {
        search = (search || '').split(/[\&\?]/g);
        for (var i = 0, count = search.length; i < count; i++) {
            if (!search[i]) continue;
            var pair = search[i].split('=');
            console.log(i, pair)
            queryString[pair[0]] = queryString[pair[0]] !== undefined 
                ? ([pair[1] || ''].concat(queryString[pair[0]])) 
                : (pair[1] || '');
        }        
    })(window.location.search);

    window.document.addEventListener("visibilitychange", function(e) {
        browserMovedToBackground = window.document.visibilityState === 'hidden' || window.document.visibilityState === 'unloaded';
    });
    window.addEventListener("blur", function(e) {
        browserMovedToBackground = true;
    });


    var AppRedirect = {
        queryString: queryString,

        redirect: function (options) {
            var hasIos = !!(options.iosApp || options.iosAppStore);
            var hasAndroid = !!(options.android);
            var hasOverallFallback = !!(options.overallFallback);

            var tryToOpenInMultiplePhases = function(urls) {
                browserMovedToBackground = false;

                var currentIndex = 0;
                
                // const handleAlert = () => {
                //     window.alert = function(message) {
                //         if (message.includes('адрес недействителен')) {
                //             return true;
                //         }
                        
                //         return false
                //     };
                    
                // }
                
                // if(handleAlert()) {
                //     window.location = urls[currentIndex++]
                // } else {
                //     document.getElementById("l").src = urls[0];
                // }
                
                // var redirectTime = new Date(Date.now());

                var timer;

                var counter = 0;
                const visibilityChangeHandler = () => {
                    if (counter++) {
                        document.removeEventListener('visibilitychange', visibilityChangeHandler);
                        return;
                    }
                    IOSAppIsInstalled = true;
                    if (document.hidden) {
                        window.clearTimeout(timer);
                    }
                };
                document.addEventListener('visibilitychange', visibilityChangeHandler);
                window.location.href = urls[currentIndex++];
                timer = setTimeout(() => {
                    if (!document.hidden) {
                        window.location.href = urls[currentIndex++];
                    }
                }, 5000);

                // var next = function () {
                //     if (urls.length > currentIndex) {
                //         setTimeout(function () {

                //             if (browserMovedToBackground) {
                //                 console.log('Browser moved to the background, we assume that we are done here')
                //                 return;
                //             }

                //             if (new Date(Date.now()) - redirectTime > 1000) {
                //                 console.log('Enough time has passed, the app is probably open');
                //             } else {
                //                 redirectTime = new Date();
                //                 window.location.href = urls[currentIndex++];
                //                 next();
                //             }

                //         }, 10);
                //     }
                // };

                // next();
            };

            if (hasIos && /iP(hone|ad|od)/.test(navigator.userAgent)) {
                var urls = [];
                if (options.iosApp) {
                    urls.push(options.iosApp);
                } 
                if (options.iosAppStore){
                    urls.push(options.iosAppStore);
                }
                tryToOpenInMultiplePhases(urls);
                
            } else if (hasAndroid && /Android/.test(navigator.userAgent)) {
                var intent = options.android;
                var intentUrl = 'intent://' + intent.host + '#Intent;' +
                    'scheme=' + encodeURIComponent(intent.scheme) + ';' + 
                    'package=' + encodeURIComponent(intent.package) + ';' + 
                    (intent.action ? 'action=' + encodeURIComponent(intent.action) + ';': '') + 
                    (intent.category ? 'category=' + encodeURIComponent(intent.category) + ';': '') + 
                    (intent.component ? 'component=' + encodeURIComponent(intent.component) + ';': '') + 
                    (intent.fallback ? 'S.browser_fallback_url=' + encodeURIComponent(intent.fallback) + ';': '') + 
                    'end';
                var anchor = document.createElement('a');
                document.body.appendChild(anchor);
                anchor.href = intentUrl;
                if (anchor.click) {
                    anchor.click();
                } else {
                    window.location = intentUrl;
                }
            } else if(hasOverallFallback) {
                window.location = options.overallFallback;
            } else {
                console.log('Unknown platform and no overallFallback URL, nothing to do');
            }
        }
    };

    return AppRedirect;
};

export default redirectConfig;
