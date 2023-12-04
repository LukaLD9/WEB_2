console.log("script.js loaded!")


var startTime = performance.now();

window.addEventListener('load', function() {
    var endTime = performance.now();
    var loadTime = endTime - startTime;
    console.log('Vrijeme učitavanja u script.js: ' + loadTime + ' ms');
});