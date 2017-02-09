/**
 * @desc curtain-like slider for angular apps
 *
 * @example <curtain-slider></curtain-slider>
 */

angular
    .module('ngCurtainSlider', [])
    .controller('curtainCtrl', curtainCtrl)
    .directive('curtainSlider', curtainSlider);

    curtainCtrl.$inject = ['$scope'];

    function curtainCtrl($scope) {

    }

    function curtainSlider() {

        return {
            restrict: 'E',
            templateUrl: '../src/curtain-slider.html',
            controller: 'curtainCtrl',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                ngModel: '=',
                imgsrc: '='
            },
            link: link
        };

        function link(scope, elem, attrs) {

            /**
             * @curtain defines curtain(left image container) (DOM element)
             *
             * @curtainImg defines left image (DOM element)
             *
             * @coveredImg defines right image (DOM element)
             *
             * @range defines range input - slider manipulator (DOM element)
             */

            var $curtain = elem.find('div').eq(1)[0];
            var $curtainImg = elem.children('div').find('img')[0];
            var $coveredImg = elem.children('div').find('img')[1];
            var $range = elem.find('input')[0];

            // Evaluate expression (object in our case) passed through attribute
            var imgSource = scope.$eval(attrs.imgsrc);

            // Assign image sources from the attribute values passed
            $curtainImg.src = imgSource.left;
            $coveredImg.src = imgSource.right;


            // Browser identifiers
            var browser = {
                isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
                isFirefox: typeof InstallTrigger !== 'undefined',
                isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification),
                isIE: /*@cc_on!@*/false || !!document.documentMode,
                isEdge: !this.isIE && !!window.StyleMedia,
                isChrome: !!window.chrome && !!window.chrome.webstore,
                isBlink: (this.isChrome || this.isOpera) && !!window.CSS
            };

            /**
             * The main problem was that without offset our slider manipulator (which is range slider btw) was situated
             * on the border of image divider - not in the center of it. I have calculated that this offset changes
             * as cosine wave with an amplitude = 7 and for Firefox Browsers amplitude = 9;
             *
             * @offset defines how much space should slider manipulator go left or right
             *
             * @rangeRatio gets 1% of slider's width
             */
            var offset = 0;
            var rangeRatio = 0;

            // After content loaded start a function
            elem.ready(function () {

                scope.initSlider = function () {

                    offset = 7 * Math.cos($range.value * 3.1415 / 100);

                    rangeRatio = $range.offsetWidth / 100;
                    
                    switch (browser) {
                        case browser.isChrome:
                            offset = 7 * Math.cos($range.value * 3.1415 / 100);
                            break;
                        case browser.isFirefox:
                            offset = 9 * Math.cos($range.value * 3.1415 / 100);
                            break;
                        default:
                            offset = 7 * Math.cos($range.value * 3.1415 / 100);
                    }
                    
                    // Sets width of curtain (div element)
                    $curtain.style.width = $range.value * rangeRatio + offset + 'px';
                };
            });
        }
    }