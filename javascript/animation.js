var tl = gsap.timeline();

tl.from(".herocontainer img", {
    opacity: 0,
    scale: 1.25,
    duration: 1,
    delay: 2,
})

tl.from(".topnav", {
    opacity: 0,
    y: -20,
    duration: 0.3,
})

tl.from(".topnav img", {
    opacity: 0,
    x: -10,
    duration: 0.3,
})

tl.from(".list a, .searchWrapper", {
    opacity: 0,
    y: 10,
    stagger: 0.1,
    duration: 0.5,
})

tl.from(".herocontainer h3, .herocontainer p", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.2,
})

tl.from("footer", {
    opacity: 0,
    y: 10,
    duration: 0.5,
});



let boxes = document.querySelectorAll('.box');
Array.from(boxes).forEach((box) => {
    box.classList.add("reveal");
})

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
            reveals[i].classList.add("fade-bottom");
        } else {
            reveals[i].classList.remove("active");
            reveals[i].classList.remove("fade-bottom");
        }
    }
}

window.addEventListener("scroll", reveal);



var tl2 = gsap.timeline();


tl2.from(".link-section a", {
    opacity: 0,
    y: -20,
    delay:1,
    stagger:0.15,
    duration: 0.5,
})

tl2.from(".intro" , {
    opacity:0,
    x:-10,
    duration:0.4,
})

tl2.from(".form-section" , {
    opacity:0,
    y:10,
    duration:0.4,
})

tl2.from(".foot-head,.foot-navlinks,.foot-social,.foot-last" , {
    opacity:0,
    duration:1,
});


var tl3 = gsap.timeline();

tl3.from(".nav-links a", {
    opacity: 0,
    y: -20,
    delay:1,
    stagger:0.1,
    duration: 0.5,
})
tl3.from(".about-solve-it" , {
    opacity:0,
    scale:0.5,
    x:-10,
})
tl3.from(".about-text" , {
    opacity:0,
    y:10,
    duration:0.5,
    stagger:0.3,
});
