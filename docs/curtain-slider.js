/**
 * @desc curtain-like slider for angular apps
 *
 * @example <curtain-slider imgsrc="{left: '../demo/img/cheetah.jpg', right: '../demo/img/tree.jpg'}"></curtain-slider>
 * Inside your html create a tag <curtain-slider></curtain-slider>
 * specify left and right image as an object inside attribute with routes to the img sources.
 */

angular
    .module('ngCurtainSlider', [])
    .controller('curtainCtrl', curtainCtrl)
    .directive('curtainSlider', curtainSlider);

    curtainCtrl.$inject = ['$scope'];

    function curtainCtrl($scope) {
        var vm = this;

        vm.evaluateLeft = evaluateLeft;
        vm.evaluateRight = evaluateRight;
        vm.setStep = setStep;

        vm.imgsrc = {
            left: 'img/12.jpg',
            right: 'img/13.jpg',
            step: 1.1
        };

        function evaluateLeft() {
            vm.imgsrc.left = vm.setLeft;
        }

        function evaluateRight() {
            vm.imgsrc.right = vm.setRight;
        }

        function setStep() {
            vm.imgsrc.step = vm.step;
            console.log(vm.imgsrc.step);
        }
    }

    function curtainSlider() {

        return {
            restrict: 'E',
            template:
            '<div class="image-slider">' +
                '<div class="curtain">' +
                    '<img src="" alt="" class="curtainImg">' +
                '</div>' +
                '<img src="" alt="" class="coveredImg">' +
                '<input type="range" class="range" step="0.1" ng-model="slider" ng-change="initSlider()">' +
            '</div>',
            controller: 'curtainCtrl',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                imgsrc: '=',
                step: '='
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

            scope.$watch(attrs.imgsrc, function () {
                var imgSource = scope.$eval(attrs.imgsrc);
                console.log(imgSource);
                $curtainImg.src = imgSource.left;
                $coveredImg.src = imgSource.right;
                $range.step = imgSource.step;
            });


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