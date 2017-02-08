(function () {
"use strict";

angular
    .module('curtainSliderModule', [])
    .controller('curtainCtrl', curtainCtrl)
    .directive('curtainSlider', curtainSlider);

    curtainCtrl.$inject = ['$scope'];

    function curtainCtrl($scope) {

    }

    function curtainSlider() {

        return {
            restrict: 'E',
            templateUrl: 'slider/curtain-slider.html',
            controller: 'curtainCtrl',
            scope: {
                ngModel: '='
            },

            link: function(scope, elem, attrs) {

                var $curtain = elem.find('div').eq(1);
                var $curtainImg = $curtain.find('img');
                var $coveredImg = elem.children('img');
                var $range = elem.find('input');

                var browser = {
                    isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
                    isFirefox: typeof InstallTrigger !== 'undefined',
                    isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification),
                    isIE: /*@cc_on!@*/false || !!document.documentMode,
                    isEdge: !this.isIE && !!window.StyleMedia,
                    isChrome: !!window.chrome && !!window.chrome.webstore,
                    isBlink: (this.isChrome || this.isOpera) && !!window.CSS
                };

                var offset = 0;
                var rangeRatio = 0;

                scope.initSlider = function () {
                    $curtainImg[0].style.width = $coveredImg[0].offsetWidth;

                    offset = 7 * Math.cos($range[0].value * 3.1415 / 100);
                    rangeRatio = $range[0].offsetWidth / 100;

                    if (browser.isChrome) {
                        offset = 7 * Math.cos($range[0].value * 3.1415 / 100);
                        rangeRatio = $range[0].offsetWidth / 100;
                    } else if (browser.isFirefox) {
                        offset = 9 * Math.cos($range[0].value * 3.1415 / 100);
                        rangeRatio = $range[0].offsetWidth / 100;
                    }

                    $curtain[0].style.width = $range[0].value * rangeRatio + offset + 'px';
                };


            }

        }
    }

})();