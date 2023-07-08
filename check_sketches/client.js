const accept_button = document.getElementById('accept')
const reject_button = document.getElementById('reject')
const forward_button = document.getElementById('forward')
const backward_button = document.getElementById('backward')

const sketch = document.getElementById('sketch')
const image = document.getElementById('image')

const msg = document.getElementById('submitted')
const controls = document.getElementById('controls')

// insert sketch_name array here
const sketch_names = ['sketches/1160-37585-59041894.png', 'sketches/1951-86756-21824637.png', 'sketches/3863-26576-80095816.png', 'sketches/838-52948-64598429.png', 'sketches/1623-34259-66398522.png', 'sketches/656-52234-89947085.png', 'sketches/3204-97949-54219814.png', 'sketches/2594-95523-95501934.png', 'sketches/4688-68541-54412685.png', 'sketches/4329-59768-47422291.png', 'sketches/5302-2939-54781479.png', 'sketches/2074-74896-26019087.png', 'sketches/2097-95779-76773864.png', 'sketches/5361-88165-97304685.png', 'sketches/3996-62546-73663358.png', 'sketches/2175-59445-37330301.png', 'sketches/1163-33541-81580752.png', 'sketches/3632-62512-84754316.png', 'sketches/130-100106-88316835.png', 'sketches/2356-515-59074251.png', 'sketches/3223-73169-58860314.png', 'sketches/4920-60771-87661325.png', 'sketches/3900-33469-74124846.png', 'sketches/465-42178-95672350.png', 'sketches/539-60109-36933941.png', 'sketches/2738-69585-34491899.png', 'sketches/3761-52969-57117776.png', 'sketches/2192-36354-47820450.png', 'sketches/3764-88089-13399031.png', 'sketches/926-6919-88423679.png', 'sketches/3226-97417-99887682.png', 'sketches/1484-11164-79952205.png', 'sketches/3882-6493-60701231.png', 'sketches/2756-100287-35686152.png', 'sketches/5224-52434-36880818.png', 'sketches/1495-27452-5954985.png', 'sketches/396-87191-11141394.png', 'sketches/5564-23140-34396299.png', 'sketches/3360-57553-55940658.png', 'sketches/2899-50256-76944310.png', 'sketches/2231-39967-80474484.png', 'sketches/115-32622-57387172.png', 'sketches/920-97709-34810766.png', 'sketches/1191-71893-88134177.png', 'sketches/5702-62679-3780422.png', 'sketches/3878-11376-6219449.png', 'sketches/3908-88913-67523790.png', 'sketches/1940-98631-25245070.png', 'sketches/941-85510-44537235.png', 'sketches/1565-37539-56381106.png', 'sketches/2732-44735-64802671.png', 'sketches/5354-49225-87315039.png', 'sketches/5205-12583-25414003.png', 'sketches/2191-94766-89031352.png', 'sketches/5318-96472-70894942.png', 'sketches/5013-18362-19062839.png', 'sketches/4473-53234-13324002.png', 'sketches/1116-28192-29426994.png', 'sketches/2855-45134-20781233.png', 'sketches/291-41728-48104039.png', 'sketches/4699-32174-38014511.png', 'sketches/3560-98314-51654935.png', 'sketches/1470-44063-80646767.png', 'sketches/2240-10286-21727249.png', 'sketches/534-60859-39274649.png', 'sketches/5233-67891-84021504.png', 'sketches/1314-9596-62249357.png', 'sketches/5757-7319-94147387.png', 'sketches/1938-36625-18192749.png', 'sketches/5591-83136-96871976.png', 'sketches/1619-70452-26153454.png', 'sketches/3345-75031-86100182.png', 'sketches/2732-44735-29100548.png', 'sketches/145-35231-26840760.png', 'sketches/5595-99350-2706163.png', 'sketches/1466-7018-82076595.png', 'sketches/3514-89761-34078984.png', 'sketches/2947-8070-42924016.png', 'sketches/764-30587-82397442.png', 'sketches/3170-18325-37760110.png', 'sketches/2600-1780-87835133.png', 'sketches/4784-44300-29574342.png', 'sketches/3234-32677-30276800.png', 'sketches/307-87830-83247292.png', 'sketches/1796-102929-15919606.png', 'sketches/5001-73549-76435306.png', 'sketches/4612-98897-10272977.png', 'sketches/3483-48869-48332126.png', 'sketches/1330-37700-92124674.png', 'sketches/5466-27722-10441644.png', 'sketches/66-51894-43666165.png', 'sketches/1500-21047-78844214.png', 'sketches/4279-23905-2094468.png', 'sketches/2347-39292-95529193.png', 'sketches/3042-39507-73658571.png', 'sketches/465-42178-71681219.png', 'sketches/4444-41582-13601323.png', 'sketches/1696-72629-31917173.png', 'sketches/4145-46466-41320262.png', 'sketches/1101-74131-67361319.png', 'sketches/4916-2552-96308231.png', 'sketches/4946-94999-93491546.png', 'sketches/4029-44453-73463723.png', 'sketches/1233-54145-90742627.png', 'sketches/3719-53417-9487244.png', 'sketches/1674-85842-94036179.png', 'sketches/5053-87348-69226783.png', 'sketches/4750-19526-4595007.png', 'sketches/2702-66808-38625836.png', 'sketches/5269-7027-41979352.png', 'sketches/4357-85991-14722916.png', 'sketches/5404-100294-59930677.png', 'sketches/5091-6133-66148022.png', 'sketches/1332-46625-99557196.png', 'sketches/3282-24813-81520520.png', 'sketches/3153-49267-30954398.png', 'sketches/4310-103009-21239438.png', 'sketches/2448-78824-49631282.png', 'sketches/4546-35732-44916355.png', 'sketches/5184-70071-6478301.png', 'sketches/2025-30218-91626192.png', 'sketches/3007-11465-80387744.png', 'sketches/3374-48778-72656533.png', 'sketches/2715-101256-42437120.png', 'sketches/2506-98732-95149440.png', 'sketches/2677-75636-14627101.png', 'sketches/3137-64916-92367520.png', 'sketches/3647-46082-38005230.png', 'sketches/5201-23528-91982945.png', 'sketches/4532-83311-30030605.png', 'sketches/4924-99080-3465219.png', 'sketches/3695-24628-18135942.png', 'sketches/1937-30492-13264573.png', 'sketches/4587-40020-82747460.png', 'sketches/4862-29405-15824840.png', 'sketches/3530-84744-93246294.png', 'sketches/2082-3001-53025141.png', 'sketches/899-59828-39250116.png', 'sketches/5980-17060-43261947.png', 'sketches/3061-69024-97437823.png', 'sketches/981-80148-43884573.png', 'sketches/4477-3411-3636618.png', 'sketches/721-90905-64766259.png', 'sketches/208-51577-53552433.png', 'sketches/1543-89200-54237741.png', 'sketches/2738-69585-3096282.png', 'sketches/1066-29794-69097607.png', 'sketches/1626-81308-41157913.png', 'sketches/2346-65814-87948256.png', 'sketches/5924-81276-12728574.png', 'sketches/1616-16300-31132496.png', 'sketches/3805-83402-21210401.png', 'sketches/4586-34248-84078518.png', 'sketches/5953-30113-99276724.png', 'sketches/1111-17872-83997210.png', 'sketches/4643-2444-63084020.png', 'sketches/4801-48003-15299780.png', 'sketches/2293-56755-83477123.png', 'sketches/5053-87348-45842999.png', 'sketches/2998-88232-55072803.png', 'sketches/1832-98310-60420494.png', 'sketches/4062-31310-82650051.png', 'sketches/4719-77931-58859794.png', 'sketches/4641-39244-4055983.png', 'sketches/3667-79082-93098148.png', 'sketches/1436-1366-14956080.png', 'sketches/2837-79-64330898.png', 'sketches/3846-19586-70711564.png', 'sketches/4775-54073-27433646.png', 'sketches/1400-74577-40338743.png', 'sketches/3665-64758-73595387.png', 'sketches/5251-18754-98537424.png', 'sketches/5208-67487-1729416.png', 'sketches/929-48018-32139738.png', 'sketches/2634-89602-22047423.png', 'sketches/4279-23905-29796101.png', 'sketches/5315-60923-94694155.png', 'sketches/1863-11189-75979715.png', 'sketches/1085-22554-18888760.png', 'sketches/4287-46445-7815305.png', 'sketches/1960-33668-37408661.png', 'sketches/1031-575-62220069.png', 'sketches/1002-25999-58477091.png', 'sketches/5621-93683-74697963.png', 'sketches/5419-59280-72415628.png', 'sketches/1916-75645-64587320.png', 'sketches/5998-2751-93433981.png', 'sketches/5396-11417-76620035.png', 'sketches/4206-32824-37399314.png', 'sketches/3596-13503-52677159.png', 'sketches/3810-33192-8854393.png', 'sketches/1780-15827-31782721.png', 'sketches/5101-75943-15743697.png', 'sketches/2318-96383-8822615.png', 'sketches/1352-35716-55349303.png', 'sketches/5249-345-78328205.png', 'sketches/449-49866-35385152.png', 'sketches/1971-20863-64528224.png', 'sketches/2909-25041-45398742.png', 'sketches/3011-51016-35954022.png', 'sketches/2572-27559-59357170.png', 'sketches/3242-17636-78233598.png', 'sketches/878-14517-71610979.png', 'sketches/3900-33469-98253186.png', 'sketches/4461-29841-95717859.png', 'sketches/4461-29841-19691285.png', 'sketches/1949-68246-43785244.png', 'sketches/2409-85151-62563557.png', 'sketches/1992-87110-48212853.png', 'sketches/266-30949-13673300.png', 'sketches/2936-55787-44113842.png', 'sketches/4711-26991-19736282.png', 'sketches/2466-3485-79130122.png', 'sketches/2624-61786-81911577.png', 'sketches/410-96757-56072207.png', 'sketches/4026-72710-33013002.png', 'sketches/4575-5807-51963008.png', 'sketches/1292-36850-48895912.png', 'sketches/3862-63893-508135.png', 'sketches/3508-1731-65760687.png', 'sketches/5580-57481-60414981.png', 'sketches/4573-101581-69547012.png', 'sketches/2398-48004-78762833.png', 'sketches/2561-38903-67222740.png', 'sketches/5977-13471-79033465.png', 'sketches/1784-47542-37462222.png', 'sketches/2522-14601-28941165.png', 'sketches/3484-51204-49910261.png', 'sketches/5672-45184-44628896.png', 'sketches/1296-23280-9911369.png', 'sketches/1266-40861-55579733.png', 'sketches/2745-93139-42520646.png', 'sketches/3148-42721-18568336.png', 'sketches/71-83497-23847162.png', 'sketches/4879-61362-73280468.png', 'sketches/1237-4940-91352951.png', 'sketches/5354-49225-11533770.png', 'sketches/4761-2774-74820767.png', 'sketches/2728-18617-36820589.png', 'sketches/1887-101433-75932832.png', 'sketches/3895-56390-29174267.png', 'sketches/5611-31070-34796273.png', 'sketches/1383-28948-64370176.png', 'sketches/1679-4652-12176128.png', 'sketches/4067-55788-60427326.png', 'sketches/5244-69268-55545921.png', 'sketches/4754-65419-71896871.png', 'sketches/3871-37425-54129564.png', 'sketches/757-733-20440749.png', 'sketches/4958-48171-93040603.png', 'sketches/5619-43507-49061749.png', 'sketches/116-57431-4342737.png']
let current_index = 0

let results = []

update_ui(current_index)

function get_image_name(index) {
    return sketch_names[index].split('-')[1] + '.jpg'
}

function set_size(element, img_src) {
    const img = new Image()
    img.onload = function() {
        console.log(this.width + 'x' + this.height)
        if (this.height > this.width) {
            element.style.width = 'auto'
            element.style.height = '100%'
        } else {
            element.style.height = 'auto'
            element.style.width = '100%'
        }
    }
    img.src = img_src
}

function update_ui(index) {
    sketch.src = sketch_names[index]
    //console.log(sketch.naturalHeight, sketch.naturalWidth)
    image.src = '../public/paintings/' + get_image_name(index)

    set_size(sketch, sketch_names[index])
    set_size(image, sketch_names[index])
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