// 1. Basic Setup

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
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
