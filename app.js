const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

canv.width = window.innerWidth;
canv.height = window.innerHeight;
// plz upload images with 100 x 100 pixels only
let img = new Image();
img.src = "./spung.jpg";
// img.src = "./download.png";
// img.src = "./fat.png";
ctx.fillStyle = "rgb(50, 50, 50)"
ctx.fillRect(0, 0, canv.width, canv.height);

let particles = [];

img.addEventListener("load", e => {
  ctx.drawImage(img, 0, 0, 500, 500);
  let imgData = ctx.getImageData(0, 0, 500, 500);
  let data = imgData.data;

  for (let y = 0; y < 500; y+=4) {
    for (let x = 0; x < 500; x+=4) {
      let i = (y * 500 + x) * 4;
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      if (r + g + b < 600) {
        let particle = {
          x: x, 
          y: y,
          dx: 0,
          dy: 0,
          ax: (Math.random() * 2 - 1) / 100,
          ay: (Math.random() * 2 - 1) / 100,
          col: `rgb(${r}, ${g}, ${b})`,
        }
        particles.push(particle);
      }
    }
  }
  
  ctx.fillStyle = "rgb(220, 210, 200)";
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = "black";
  ctx.fillText(particles.length, 10, 10);
  for (let i = 0; i < particles.length; i++) {
    ctx.fillStyle = particles[i].col;
    ctx.fillRect(particles[i].x, particles[i].y, 4, 4); 
  }
})

function update() {
  ctx.fillStyle = "rgb(50, 50, 50)";
  ctx.fillRect(0, 0, canv.width, canv.height);
  ctx.fillStyle = "rgb(220, 210, 200)";
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = "black";
  ctx.fillText(particles.length, 10, 10);
  for (let i = 0; i < particles.length; i++) {
    ctx.fillStyle = particles[i].col;
    particles[i].x += particles[i].dx;
    particles[i].y += particles[i].dy;
    particles[i].dx += particles[i].ax;
    particles[i].dy += particles[i].ay;
    ctx.fillRect(particles[i].x, particles[i].y, 4, 4);
  }
}

function start() {
  setInterval(update, 17);
}

setTimeout(start, 3000);