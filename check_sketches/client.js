const accept_button = document.getElementById('accept')
const reject_button = document.getElementById('reject')
const forward_button = document.getElementById('forward')
const backward_button = document.getElementById('backward')

const sketch = document.getElementById('sketch')
const image = document.getElementById('image')

const msg = document.getElementById('submitted')
const controls = document.getElementById('controls')

// insert sketch_name array here
const sketch_names = ['sketches/1951-86756-21824637.png', 'sketches/1330-37700-92124674.png', 'sketches/1237-4940-91352951.png']
let current_index = 0

let results = []

update_ui(current_index)

function get_image_name(index) {
    return sketch_names[index].split('-')[1] + '.jpg'
}

function update_ui(index) {
    sketch.src = sketch_names[index]
    image.src = '../public/paintings/' + get_image_name(index)
}

function add_result(index, accepted) {
    const sketch_name = sketch_names[index].split('/')[1]
    const image_name = get_image_name(index)

    console.log(results)

    for (let i = 0; i < results.length; i++) {
        if (results[i][0] == sketch_name) {
            results.splice(i, 1, [sketch_name, image_name, accepted])
            return
        }
    }

    results.push([sketch_name, image_name, accepted])
}

function save_results() {
    msg.style.display = 'flex'
    controls.style.pointerEvents = 'none'

    let csvContent = "data:text/csv;charset=utf-8,sketch,image,valid\n"
    csvContent += results.map(e => e.join(',')).join('\n')

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "categorized_sketches.csv")
    document.body.appendChild(link); // Required for FF

    link.click()
}

accept_button.addEventListener('click', () => {
    add_result(current_index, 1)

    current_index += 1

    if (current_index < sketch_names.length) update_ui(current_index)
    else save_results()
})

reject_button.addEventListener('click', () => {
    add_result(current_index, 0)

    current_index += 1

    if (current_index < sketch_names.length) update_ui(current_index)
    else save_results()
})


forward_button.addEventListener('click', () => {
    current_index += 1
    if (current_index >= sketch_names.length) current_index -= 1
    update_ui(current_index)
})
backward_button.addEventListener('click', () => {
    current_index -= 1

    if ( current_index < 0) current_index = 0
    update_ui(current_index)
})