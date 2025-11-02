const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
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
InfinteScroll() 
Background()


