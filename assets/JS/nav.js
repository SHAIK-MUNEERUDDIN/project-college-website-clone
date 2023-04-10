// script to stick navbar on top
window.onload = function () {
    window.onscroll = function () { myFunction() };

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
};

