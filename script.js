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
function CursurAnimation(xScale,yScale) {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#crsr", {
      left: dets.x,
      top: dets.y,
      scaleX: xScale,
      scaleY: yScale
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

function mousemovement(){
  var xScale = 1;
  var yScale =1;
  var xprev = 0;
  var yprev = 0
  window.addEventListener("mousemove",function(dets){
xprev = dets.clientX
yprev = dets.clientY
 xScale = gsap.utils.clamp(0.8,1.2,dets.clientX - xprev);
 yScale =gsap.utils.clamp(0.8,1.2,dets.clientY - yprev);
// console.log(x,y)
CursurAnimation(xScale,yScale)
  })
} 
// function ImageHover(){
// var elem = document.querySelectorAll(".elem")
// elem.forEach(function(elem){
//   elem.addEventListener("mousemove",function(dets){
//    const ydiff =Math.floor(dets.clientY- elem.getBoundingClientRect().top)
//    const xdiff =Math.floor(dets.clientX- elem.getBoundingClientRect().left)
// // console.log(dets.clientX,dets.clientY)
// gsap.to(elem.querySelector("img"),{
//   opacity:1,
//   ease:Power1,
//   top:ydiff,
//   left: xdiff

// })
//   })
//   elem.addEventListener('mouseleave',function(){
//     gsap.to(elem.querySelector("img"),{
//   opacity:0,

// })
//   })
// })
// }
function ImageHover() {
  var elem = document.querySelectorAll(".elem");

  elem.forEach(function (elem) {
    const img = elem.querySelector("img");
elem.addEventListener("mouseleave",function(){
  gsap.to(img,{
    opacity:0
  })
})
    elem.addEventListener("mousemove", function (dets) {
      const rect = elem.getBoundingClientRect();
      const ydiff = dets.clientY - rect.top;
      const xdiff = dets.clientX - rect.left;


      gsap.to(img, {
        opacity: 1,
        // ease: "power1.out",
        top: ydiff,
        left: xdiff,
        duration: 0.2,
        
      });

    });
   
  });
}

mousemovement()
locomotiveAnimation()
InfinteScroll() 
Background()
CursurAnimation()
ImageHover()