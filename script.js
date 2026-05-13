// STARS

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas(){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let stars = [];

for(let i = 0; i < 120; i++){

  stars.push({

    x:Math.random() * window.innerWidth,
    y:Math.random() * window.innerHeight,

    radius:Math.random() * 2,

    dx:(Math.random() - 0.5) * 0.15,
    dy:(Math.random() - 0.5) * 0.15,

    opacity:Math.random()

  });

}

function animateStars(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(star => {

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
    `rgba(255,255,255,${star.opacity})`;

    ctx.fill();

    star.x += star.dx;
    star.y += star.dy;

    if(star.x < 0 || star.x > canvas.width){
      star.dx *= -1;
    }

    if(star.y < 0 || star.y > canvas.height){
      star.dy *= -1;
    }

  });

  requestAnimationFrame(animateStars);

}

animateStars();


// REVEAL

const reveals =
document.querySelectorAll(".reveal");

const observer =
new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      entry.target.classList.add("active");

    }

  });

},{
  threshold:0.15
});

reveals.forEach(reveal => {

  observer.observe(reveal);

});


// PROJECTS

const cards =
document.querySelectorAll(".card");

const projects =
document.querySelectorAll(".project-details");

cards.forEach(card => {

  card.addEventListener("click", () => {

    const target =
    card.dataset.project;

    projects.forEach(project => {

      const video =
      project.querySelector("video");

      if(project.id === target){

        project.classList.toggle("active");

        if(video){

          video.currentTime = 0;

          if(project.classList.contains("active")){
            video.play();
          }else{
            video.pause();
          }

        }

      }else{

        project.classList.remove("active");

        if(video){
          video.pause();
        }

      }

    });

    setTimeout(() => {

      document
      .getElementById(target)
      .scrollIntoView({
        behavior:"smooth"
      });

    },200);

  });

});


// LIGHTBOX

const galleryImages =
document.querySelectorAll(".gallery img");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const closeLightbox =
document.querySelector(".close-lightbox");

galleryImages.forEach(image => {

  image.addEventListener("click", () => {

    lightbox.classList.add("active");

    lightboxImg.src = image.src;

  });

});

closeLightbox.addEventListener("click", () => {

  lightbox.classList.remove("active");

});

lightbox.addEventListener("click", (e) => {

  if(e.target !== lightboxImg){

    lightbox.classList.remove("active");

  }

});