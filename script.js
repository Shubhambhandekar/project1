var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleMouseFollower() {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) ) `;
  });
}

function mouseskewz() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower2(xscale, yscale);

    function circleMouseFollower2(xscale, yscale) {
      window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale} , ${yscale}) `;
      });
    }

    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

mouseskewz();
circleMouseFollower();
firstPageAnim();

// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye


//elem.getBoundingClientRect() is used to determine the height between laptop sereen top and the div 

// console.log(dts.clientY - elem.getBoundingClientRect().top);  to see the diffrence when the mouse is inside the div

document.querySelectorAll(".elem")
  .forEach(function (elem) {
    elem.addEventListener("mousemove", function (dts) {
      var diff = dts.clientY - elem.getBoundingClientRect().top;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power1,
        top: diff,
        left: dts.clientX,
      })
    })
  })


// for rotating the img
document.querySelectorAll(".elem").forEach(function (elem) {

  var diffrotate = 0;
  var prev = 0;

  // for mouses leave
  elem.addEventListener("mouseleave", function (dts) {  // for mouse leave when the curser enter in another div
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration:0.5,
       // for reduce the rotation multiplay the diffrotate with .2
    })
  })

  elem.addEventListener("mousemove", function (dts) {
    var diff = dts.clientY - elem.getBoundingClientRect().top;
    
    diffrotate = dts.clientX - prev;
    prev = dts.clientX;
    
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dts.clientX,
      rotate:gsap.utils.clamp(-20,20,diffrotate), // for reduce the rotation multiplay the diffrotate with .2
    })
  })
})


const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");
