// storage connection

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js" //from "firebase/app"
import { getStorage, ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js" //from "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  storageBucket: 'sketchit-38b52.appspot.com'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

const namesRef = ref(storage, 'painting_names.csv')
const sketchRef = ref(storage, 'sketches')

let image_names = []
let current_image_idx = -1

getDownloadURL(namesRef)
  .then((url) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'text'
    xhr.onload = (event) => {
      image_names = parseCSV(xhr.response)
    }
    xhr.open('GET', url)
    xhr.send()

    // Or inserted into an <img> element
    //const img = document.getElementById('myimg')
    //img.setAttribute('src', url)
  })
  .catch((error) => {
    console.log(error)
  })


function parseCSV(csv) {
    let rows = csv.split('\n')
    let image_names = []
    rows.forEach( row => {
        image_names.push(row.split(';')[1])
    })
    return image_names
}


// button elements
let show_image_button = document.getElementById("show_img")
//undo_button = document.getElementById("undo")
//redo_button = document.getElementById('redo')
let erase_paint_button = document.getElementById('erase_paint')
let new_image_button = document.getElementById('new_image')
let submit_button = document.getElementById('submit')

let home_button = document.getElementsByTagName('h1')[0]

// other elements
let image = document.getElementById('image')
let canvas = document.getElementById('canvas')
let example_container = document.getElementById('example_container')
let canvas_container = document.getElementById('canvas_container')
let image_container = document.getElementById('image_container')
let submitted_message = document.getElementById('submitted')


// event listeners for buttons
show_image_button.addEventListener('click', () => {
    if (current_image_idx < 0 || sketch_uploaded) get_new_image()
    else show_image('paintings/' + image_names[current_image_idx])
})

submit_button.addEventListener('click', () => {
    if (sketch_started) upload_sketch()
    else alert("Submitting sketch failed")
})

home_button.addEventListener('click', () => {
    canvas_container.style.display = 'none'
    example_container.style.display = 'flex'
})

new_image_button.addEventListener('click', get_new_image)

erase_paint_button.addEventListener('click', (event) => {
    if (event.target.innerText === "Erase") {
        event.target.innerText = "Sketch"
        erase_mode = true
    } else {
        event.target.innerText = "Erase"
        erase_mode = false
    }
})

// helper functions
function upload_sketch() {
    //let sketch_data = canvas_context.getImageData(0, 0, canvas.width, canvas.height)
    let sketch_data = canvas.toDataURL('image/png')
    sketch_data = sketch_data.replace('data:image/png;base64,', "")

    // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    const byteCharacters = atob(sketch_data)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    sketch_data = new Uint8Array(byteNumbers)

    let random_number = Math.floor(Math.random() * 100000000)
    let file_name = current_image_idx.toString() + '-' + image_names[current_image_idx].split('.')[0] + '-' + random_number + '.' + 'png'

    const fileRef = ref(sketchRef, file_name)
    const metadata = { contentType: 'image/png' }

    uploadBytes(fileRef, sketch_data, metadata).then(() => {
        console.log('Uploaded sketch: ' + file_name)
        canvas_container.style.pointerEvents = 'none'
        submitted_message.style.display = 'flex'
      })

    // saves sketch locally
    /*
    const link = document.createElement('a')
    link.download = 'img/download.png'
    link.href = canvas.toDataURL()
    link.click()
    link.delete
    */
}

function get_new_image() {
    canvas_container.style.display = 'flex'
    example_container.style.display = 'none'
    submitted_message.style.display = 'none'
    canvas_container.style.pointerEvents = 'auto'

    current_image_idx = Math.floor(Math.random() * image_names.length)
    show_image('paintings/' + image_names[current_image_idx])
}

function show_image(path) {
    image_container.style.height = 'calc(80vh - 70px)'
    image_container.style.backgroundImage = ''
    image.src = path
    image.style.display = 'block'
    image.style.visibility = 'visible'

    canvas.style.display = 'none'
    erase_paint_button.style.display = 'none'

    setTimeout( () => {
        image_container.style.height = image.offsetHeight.toString() + 'px'
        image_container.style.backgroundImage = 'url("img/noise.png")'
        image.style.visibility = 'hidden'
        setTimeout( build_canvas, 700)
    }, 3000)
}

// canvas

const canvas_context = canvas.getContext('2d')
canvas_context.strokeStyle = 9

// useful to erase google functionality
//canvas_context.strokeStyle = 0

let is_drawing = false
let sketch_started = false
let sketch_uploaded = false
const LINE_WIDTH = 6

let erase_mode = false

function build_canvas() {
    image_container.style.backgroundImage = ''
    canvas_context.clearRect(0, 0, canvas.width, canvas.height) // clears canvas

    canvas.width = image.offsetWidth
    canvas.height = image.offsetHeight

    canvas.style.width = image.offsetWidth.toString() + 'px'
    image.style.display = 'none'
    canvas.style.display = 'flex'

    erase_paint_button.innerText = "Erase"
    erase_mode = false
    erase_paint_button.style.display = 'flex'

    canvas_context.fillStyle = "#ffffff";
    canvas_context.fillRect(0, 0, canvas.width, canvas.height);

    sketch_started = false
}

canvas.addEventListener('mousedown', start_draw)
window.addEventListener('mouseup', end_draw)
canvas.addEventListener('mousemove', draw)

canvas.addEventListener("touchstart", start_draw)
window.addEventListener("touchend", end_draw)
canvas.addEventListener("touchmove", draw)

const is_touch_device = window.matchMedia('(hover: none)').matches

function start_draw(e) {
    is_drawing = true
    sketch_started = true
    canvas_context.beginPath()
}

function end_draw(e) {
    is_drawing = false
    if (e.target === canvas) {
        canvas_context.stroke()
        canvas_context.closePath()
    }
}

function draw(e) {
    if (!is_drawing) return
    let x = e.clientX
    let y = e.clientY
    if (is_touch_device) {
        x = e.touches[0].clientX
        y = e.touches[0].clientY
    }

    if (erase_mode) {
        canvas_context.strokeStyle = '#ffffff'
        canvas_context.lineWidth = LINE_WIDTH + 10
    } else {
        canvas_context.lineWidth = LINE_WIDTH
        canvas_context.strokeStyle = '#000000'
    }
    canvas_context.lineCap = 'round'
    canvas_context.lineTo(x - canvas.getBoundingClientRect().left, y - canvas.getBoundingClientRect().top)
    //canvas_context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop) without position relative of image container
    canvas_context.stroke()
}