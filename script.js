function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function InfinteScroll(){
// 1. Basic Setup


const container = document.querySelector('#container');
const scroller = document.querySelector('#scroller');
// 2. Calculate heights
const sectionHeight = window.innerHeight +1;
const totalSections = 4;
const sequenceHeight = sectionHeight * totalSections;
// console.log(window.innerHeight)
// 3. Start from middle (2nd set)
let currentY = sequenceHeight; //2805
scroller.style.transform = `translateY(-${currentY}px)`;

// 4. On scroll
container.addEventListener('wheel', (e) => {
    currentY += e.deltaY; // 5650
    
    // Jump check    //  5650>5610 -467
    if (currentY > sequenceHeight * 2 - sectionHeight/2) {
        currentY -= sequenceHeight; // Jump back
        //currentY = CurrentY - 5610
    } 
    if (currentY < sectionHeight/2) {
        currentY += sequenceHeight; // Jump forward
    }
    
    scroller.style.transform = `translateY(-${currentY}px)`;
});
}
function CursurAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#crsr", {
      left: dets.x,
      top: dets.y,
    });
  });

}
function Background(){
const krishna = document.querySelector('.krishna');
const galaxy = document.querySelector('.galaxy');

document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX - innerWidth / 2) / innerWidth;
  const y = (e.clientY - innerHeight / 2) / innerHeight;

  // move Krishna more (foreground)
  krishna.style.transform = `
    translate(-50%, -50%)
    rotateY(${x * 60}deg)
    rotateX(${-y * 60}deg)
    translateZ(60px)
    scale(1.05)
  `;

  // move Galaxy slightly (background parallax)
  galaxy.style.transform = `translate(${x * 60}px, ${y * 60}px) scale(1.1)`;
});

document.addEventListener('mouseleave', () => {
  krishna.style.transform = 'translate(-50%, -50%) rotateY(0deg) rotateX(0deg) scale(1)';
  galaxy.style.transform = 'translate(0, 0) scale(1.1)';
});

}

// For Now Iam using this function later I will replace it with GSAP TextSplit 
// function textsplitting(){
//     var H1=document.querySelectorAll(".textSplit")
//     H1.forEach(element => {
//         var h1text = element.textContent
//         var clutter=""
//         var splitted = h1text.split(" ")
//         splitted.forEach(function(elem){
//             clutter +=`<span>${elem}</span>`
           
//         })
//         element.innerHTML = clutter
//     });
// }
// function gsapAnimation(){
//     gsap.to(".textSplit",{
//         color:"#e3e3c4",
//         stagger:0.1,
//         scrollTrigger:{
//             trigger:".textSplit",
//             scroller:"#main",
//            markers:true,
//             start:"top 40%",
//             end:"top -20%",
//             scrub:5,
            
//         }
    
//     })
// }

locomotiveAnimation()
InfinteScroll() 
Background()
CursurAnimation()
// textsplitting()
// gsapAnimation()