// the below script is used to stick the nav bar on top
$(document).ready(function () {
    // Load nav.html file into the navbar element
    $("#nav-placeholder").load("../Nav.html", function () {
        // This code will execute after nav.html is loaded
        var navbar = document.getElementById("navbar");
        var sticky = navbar.offsetTop;

        /* Function to stick the nav bar */
        function myFunction() {
            if (window.pageYOffset > sticky) {
                navbar.classList.add("sticky")
            }
            else {
                navbar.classList.remove("sticky");
            }
        }

        // Call myFunction() to initialize the navbar
        myFunction();

        // Attach the onscroll event to the window
        window.onscroll = function () { myFunction() };
    });
});


// the below script is used for the slideshow of about mrits
document.addEventListener('DOMContentLoaded', function () {
    // Call showSlides function after navigation bar is loaded
    var aboutMritsDiv = document.getElementById("aboutmrits");
    if (aboutMritsDiv) {
        let slideIndex = 0;
        showSlides();

        function showSlides() {
            let i;
            let slides = document.getElementsByClassName("slide");
            let dots = document.getElementsByClassName("dot");
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex].style.display = "block";
            dots[slideIndex].className += " active";
            slideIndex++;
            setTimeout(showSlides, 3000); // Change image every 3 seconds
        }
    }
});

// // the below script is used for gallery section
document.addEventListener('DOMContentLoaded', function () {
    let galleryDiv = document.getElementById("gallery");
    if (galleryDiv) {
        var gallery = document.querySelector('#gallery');
        var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
        var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
        var resizeAll = function () {
            var altura = getVal(gallery, 'grid-auto-rows');
            var gap = getVal(gallery, 'grid-row-gap');
            gallery.querySelectorAll('.gallery-item').forEach(function (item) {
                var el = item;
                el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
            });
        };
        gallery.querySelectorAll('img').forEach(function (item) {
            item.classList.add('byebye');
            if (item.complete) {
                console.log(item.src);
            }
            else {
                item.addEventListener('load', function () {
                    var altura = getVal(gallery, 'grid-auto-rows');
                    var gap = getVal(gallery, 'grid-row-gap');
                    var gitem = item.parentElement.parentElement;
                    gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                    item.classList.remove('byebye');
                });
            }
        });
        window.addEventListener('resize', resizeAll);
        gallery.querySelectorAll('.gallery-item').forEach(function (item) {
            item.addEventListener('click', function () {
                item.classList.toggle('full');
            });
        });
    }
});