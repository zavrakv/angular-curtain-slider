# Angular-curtain-slider
Angular directive for curtain-like sliders. It is a slider, fit for demonstration of before and after results (watch the demo below)

# [Demo](https://zavrakv.github.io/angular-curtain-slider/)

# Requirements 

* requires angular.js to be installed `angular^1.6.2`

# Installation

* via npm: npm install --save-dev ng-curtain-slider

# Usage

1. Add dependency injection in your app module:
    
   ```JavaScript
   angular.module('app', ['ngCurtainSlider'])
   ```
   
2. In your html specify route to the styles and script files like this:
   
   ```HTML
   <!-- CSS goes here: -->
   <link rel="stylesheet" href="../ng-curtain-slider/src/css/curtain-slider.min.css">   
   ```
   Then, after you add your angular.js script, add this:
   ```HTML
   <!-- Route to the script -->
   <script src="../ng-curtain-slider/src/curtain-slider.min.js"></script>
    ```

3. In your html file add this directive:

   ```HTML
   <curtain-slider imgsrc="{left: '../demo/img/cheetah.jpg', right: '../demo/img/tree.jpg'}"></curtain-slider>
   ```
  
4. Specify your own object inside `imgsrc` attribute. `left` represents the URL to the left image in slider, `right` - URL to the right  image in slider.

5. If you want more discrete or smooth behaviour of the slider - change the `step` attribute like this:

   ```HTML
   <curtain-slider imgsrc="{left: '../demo/img/cheetah.jpg', right: '../demo/img/tree.jpg'}" 
                    step="1"></curtain-slider>
   ```
   Value of step varies from 0.1 (very smooth) to 100 (one swipe will open or close the curtain). Default step: 0.1
