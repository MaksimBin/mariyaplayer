const playLists = [
  "T1.mp3",
  "T2.mp3",
  "T3.mp3",
  "T4.mp3",
  "T5.mp3",
  "T6.mp3",
  "T7.mp3",
  "T8.mp3",
  ]

const colors = [
        "mari2.jpg",
        "mari3.png",
        "mari-gif.gif",
        "mari5.png",
        "mari6.png",
        "mari2.jpg",
        "mari-gif1.gif",
        "mari2.jpg",
        "mari3.png",
    ]

const images = [
"gif12.gif",
"Img1.jpg",
"Logo2.png",
"Img2.jpg",
"Img1.jpg",
"Img2.jpg",
"Img1.jpg",
"Img2.jpg",
"Logo1.jpg"
   ]

const randomTexts = [
     "Мария самая лучшая",
     "Мария КРАСОТКА!!!",
     "САМАЯ ПРЕКРАСНАЯ",
     "САМАЯ МИЛАЯ",
     "ЛЮБИМАЯ",
     "ЛЮБЛЮ ТЕБЯ",
     "САМАЯ КРАСИВАЯ",
     "САМОЙ НЕЖНОЙ",
     "САМОЙ САМОЙ САМОЙ КРАСИВОЙ",
     ]

let number = 0

const getImageNumber = (number) => {
  if (number > 7) return 8
  if (number < 8) return number
}

const getColorEquliser = (number) => {
  if (number > 7) return 8
  if (number < 8) return 7
}

const getBacground = (number) => {
  if (number > 7) return 0
  if (number < 8) return number
}

const getText = (number) => {
  if (number > 7) return 8
  if (number < 8) return number
}


let modalDialog = document.getElementById('modalDialog')


document.getElementById('button').innerHTML = `<button style="width:100px;
    color:black;
    font-size: 55px;
    border-radius:50%;
    margin-left:35%;
    margin-top:20px;
    height:100px;
    background-color:white;
    border-style:none;
    box-shadow: 0px 0px 15px 5px black;" type="button" onclick="closeModal()"><</button>`

const modal = () => {

  document.getElementById('div').innerHTML = playLists.map((x, index) => `<div onclick="playModal('${x}', '${index}')" style=" box-shadow: 0px 0px 15px 5px black;margin-top:8px;display: flex; justify-content:  space-between;background-color:white;border:solid black 1px;margin-left:5px;margin-right:10px;border-radius:27px;align-items: center;">
    <img src='pngwing.com.png' alt="" width="50px" height="50px" style="border-radius:50%;">
    <button type"button"  style="color:black;font-size:14px;border-style:none;background-color:white;font-weight: bold;width:250px;">${x}</button>
    <div style="background-color:black;color:white;border-radius:50%;width:50px;height:50px;"><div style="margin-top:15px;">${index + 1}</div></div>
  </div>`)


  modalDialog.style = "display: block;"
}

const closeModal = () => {

  modalDialog.style = " display:none"
}

const startImage = () => {
  document.getElementById('styleBlock').style = `background-image: url("${images[0]}");
  background-repeat: no-repeat;
 background-size: cover;
  background-position: center;`

  document.getElementById('random').innerHTML = `${randomTexts[0]}`
}

startImage()

let audio = new Audio(playLists[0])

let result = 0

let load = document.querySelector('.loder')

let timeDiv = document.getElementById('time')


var analyzer, canvas, ctx

const onload = function(audio) {
  canvas = document.getElementById('canvas')
  canvas.width = window.innerWidth
  canvas.height = 250
  ctx = canvas.getContext('2d')
  var audioContext = new AudioContext()
  analyzer = audioContext.createAnalyser()
  analyzer.fftSize = 2048
  var source = audioContext.createMediaElementSource(audio)
  source.connect(analyzer)
  analyzer.connect(audioContext.destination)

  draw()
}

function draw() {
  requestAnimationFrame(draw)
  var spectrum = new Uint8Array(analyzer.frequencyBinCount)
  analyzer.getByteFrequencyData(spectrum)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  var prev = {
    x: 0,
    y: 0
  }

  var w = 1

  ctx.beginPath()
  ctx.moveTo(0, canvas.height)
  ctx.lineTo(0, canvas.height - spectrum[0])

  for (var i = 0; i < spectrum.length; i += w) {

    var curr = {
      x: i,
      y: canvas.height - spectrum[i]
    }

    var next = {
      x: i + w,
      y: canvas.height - spectrum[i + w]
    }

    var xc = (curr.x + next.x) / 2;
    var yc = (curr.y + next.y) / 2;
    ctx.quadraticCurveTo(curr.x, curr.y, xc, yc)

    prev = {
      x: curr.x,
      y: curr.y
    }
  }

  ctx.quadraticCurveTo(prev.x, prev.y, canvas.width, canvas.height)
  ctx.fillStyle = '#FF4500';
  ctx.closePath(); //draw to first point
  ctx.shadowColor = '#FFFF00';
  ctx.shadowBlur = 50;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = -5;
  ctx.fill();
}

const playAudio = () => {

  audio.play()
  
  onload(audio)

  setInterval(() => {

    load.innerHTML = `<div style="position: relative;border-radius:10px;width: ${audio.duration - audio.currentTime}px;height: 100%;
  background-color: #7C8885;"><div style="position: absolute;top:-5px;right:0px;width:10px;heigth:10px;background-color: black;border-radius:50%;">.</div></div>`


    timeDiv.innerHTML = parseInt(audio.duration) - parseInt(audio.currentTime)
    if (timeDiv.innerHTML == 0) {
      next()
    }
  }, 1000)
}
const playModal = (audioSrc, index) => {
  number = index
  console.log(audioSrc)
  console.log(index)
  stop()
  closeModal()

  audio = new Audio(audioSrc)
  playAudio()

  document.getElementById('styleBlock').style = `background-image:url("${images[getImageNumber(number)]}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;`

  document.getElementById('random').innerHTML = `${randomTexts[getText(number)]}`


  document.getElementById('color').style = `background-image: url("${colors[getBacground(number)]}");`

 // document.getElementById('color1').style = `color:${colors[number]};`

//  document.getElementById('color2').style = `color: ${colors[number]};`

 // document.getElementById('color3').style = `color:${colors[number]};`

}

const stop = () => {
  audio.pause()
}

const next = () => {
  audio.pause()


  if (number < playLists.length - 1) {
    number = Number(number) + 1
  } else {
    number = 0
  }
  console.log(number)

  audio = new Audio(playLists[number])

  playAudio()

  document.getElementById('styleBlock').style = `background-image:url("${images[getImageNumber(number)]}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;`

  document.getElementById('random').innerHTML = `${randomTexts[getText(number)]}`


  document.getElementById('color').style = `background-image: url("${colors[getBacground(number)]}");`

//  document.getElementById('color1').style = `color:${colors[number]};`

//  document.getElementById('color2').style = `color: ${colors[number]};`

//  document.getElementById('color3').style = `color:${colors[number]};`
}


const naz = () => {
  audio.pause()

  if (number > 0) {
    number = number - 1
  } else {
    number = playLists.length - 1
  }

  audio = new Audio(playLists[number])

  playAudio()

  document.getElementById('styleBlock').style = `background-image: url("${images[getImageNumber(number)]}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;`

  document.getElementById('random').innerHTML = `${randomTexts[getText(number)]}`


  document.getElementById('color').style = `background-image: url("${colors[getBacground(number)]}");`

//  document.getElementById('color1').style = `color:${colors[number]};`

//  document.getElementById('color2').style = `color: ${colors[number]};`

//  document.getElementById('color3').style = `color:${colors[number]};`
}

const updateNumber = (x, index) => {
  number = index
  return x
}

const showFile = (input) => {

  let files = input.files

  for (var i = 0; i < files.length; i++) {
    playLists.push(URL.createObjectURL(files[i]))
  }
}
