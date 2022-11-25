// button elements
show_image_button = document.getElementById("show_img")
//undo_button = document.getElementById("undo")
//redo_button = document.getElementById('redo')
erase_paint_button = document.getElementById('erase_paint')
new_image_button = document.getElementById('new_image')
submit_button = document.getElementById('submit')

home_button = document.getElementsByTagName('h1')[0]

// other elements
image = document.getElementById('image')
//noise = document.getElementById('noise')
canvas = document.getElementById('canvas')
example_container = document.getElementById('example_container')
canvas_container = document.getElementById('canvas_container')
image_container = document.getElementById('image_container')


// event listeners for buttons
show_image_button.addEventListener('click', () => {
    canvas_container.style.display = 'flex'
    example_container.style.display = 'none'

    show_image('img/example3.jpg')
})

submit_button.addEventListener('click', () => {
    if (sketch_started) upload_sketch()
    else alert("No sketch to save")
})

home_button.addEventListener('click', () => {
    canvas_container.style.display = 'none'
    example_container.style.display = 'flex'
    console.log('HI')
})

new_image_button.addEventListener('click', () => {
    show_image('img/example.jpg')
})

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
    console.log("upload sketch")
    sketch_data = canvas_context.getImageData(0, 0, canvas.width, canvas.height)

    // saves sketch locally
    const link = document.createElement('a')
    link.download = 'img/download.png'
    link.href = canvas.toDataURL()
    link.click()
    link.delete
}

function load_image() {
    image.src = 'img/example2.jpg'
}

function show_image(path) {
    image_container.style.backgroundImage = ''
    image.src = path
    image.style.display = 'block'
    image.style.visibility = 'visible'

    canvas.style.display = 'none'
    erase_paint_button.style.display = 'none'

    setTimeout( () => {
        image_container.style.backgroundImage = 'url("img/noise.png")'
        image.style.visibility = 'hidden'
        setTimeout( build_canvas, 1000)
    }, 2000)
}

// canvas

const canvas_context = canvas.getContext('2d')
canvas_context.strokeStyle = 9

// useful to erase google functionality
//canvas_context.strokeStyle = 0

let is_drawing = false
let sketch_started = false
const LINE_WIDTH = 6

let erase_mode = false

canvas.addEventListener('mousedown', (e) => {
    is_drawing = true
    sketch_started = true
    canvas_context.beginPath()
})

window.addEventListener('mouseup', (e) => {
    is_drawing = false
    if (e.target === canvas) {
        canvas_context.stroke()
        canvas_context.closePath()
    }
})

canvas.addEventListener('mousemove', draw)

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

function draw(e) {
    if (!is_drawing) return

    if (erase_mode) {
        canvas_context.strokeStyle = '#ffffff'
        canvas_context.lineWidth = LINE_WIDTH + 10
    } else {
        canvas_context.lineWidth = LINE_WIDTH
        canvas_context.strokeStyle = '#000000'
    }
    canvas_context.lineCap = 'round'
    canvas_context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top)
    //canvas_context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop) without position relative of image container
    canvas_context.stroke()
}