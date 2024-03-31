const s_checkbox = document.getElementById('sessional_box');
const t_checkbox = document.getElementById('termwork_box');
const e_checkbox = document.getElementById('external_box');

const sessional_input_container = document.getElementById('sessional_input_container');
const termwork_input_container = document.getElementById('termwork_input_container');
const external_input_container = document.getElementById('external_input_container');

let bool_sessional = 1;
let bool_termwork = 1;
let bool_external = 1;

s_checkbox.addEventListener('change', function () {
    if (this.checked) {
        sessional_input_container.classList.remove('d-none');
        bool_sessional = 1;
    } else {
        sessional_input_container.classList.add('d-none');
        bool_sessional = 0;

    }
});

t_checkbox.addEventListener('change', function () {
    if (this.checked) {
        termwork_input_container.classList.remove('d-none');
        bool_termwork = 1;
    } else {
        termwork_input_container.classList.add('d-none');
        bool_termwork = 0;
        termwork = 0;
    }
});

e_checkbox.addEventListener('change', function () {
    if (this.checked) {
        external_input_container.classList.remove('d-none');
        bool_external = 1;
    } else {
        external_input_container.classList.add('d-none');
        bool_external = 0;
    }
});


let all_subjects_details = [];
let index = 0;


function cal() {

    let subject = document.getElementById('subject').value;
    let credit = document.getElementById('credit').value;
    let internal = document.getElementById('internal').value;
    let attendance = document.getElementById('attendance').value;
    let termwork = document.getElementById('termwork').value;
    let external = document.getElementById('external').value;
    let external_out_of = document.getElementById('external_out_of').value;
    let termwork_out_of = document.getElementById('termwork_out_of').value;

    if (subject == "") {
        alert("enter subject name")
        return
    }
    if (credit == "") {
        alert("enter subject credit")
        return
    }

    if (bool_termwork && termwork == "") {
        alert("enter termwork mark")
        return
    }
    if (bool_external && external == "") {
        alert("enter external mark")
        return
    }
    if (bool_sessional && internal == "") {
        alert("enter sessional mark")
        return
    }



    if (bool_sessional && (internal > 36 || attendance > 4)) {
        alert("check internal/attandace marks again !!!")
        return
    }
    if ((bool_termwork)) {
        if (parseInt(termwork_out_of) - parseInt(termwork) < 0) {
            alert("check termwork marks again !!!")
            return
        }
    }
    if (bool_external) {
        if (parseInt(external_out_of) - parseInt(external) < 0) {
            alert("check external marks again !!!")
            return
        }
    }

    let total_internal_mark,total_subject_mark;


    if (!bool_termwork) {
        termwork = 0;
        termwork_out_of = 0
    }

    if (!bool_external) {
        external = 0;
        external_out_of = 0
    }

    if (!bool_sessional) {
        internal = 0;
        attendance = 0;
        total_internal_mark = 0;
    }

    if (bool_sessional) {
        total_internal_mark = 40;

        if (internal < 8) {
            alert('internal rem')
            return;
        }

        if (internal > 8 && internal < 12) {
            if (external < 24) {
                alert('external rem')
                return;
            }
        }
    }


    total_subject_mark = parseInt(bool_external) * parseInt(external_out_of) + parseInt(bool_sessional * 40) +
        parseInt(bool_termwork) * parseInt(termwork_out_of)

    // console.log("total_subject_mark: " + total_subject_mark)

    let subject_total = parseInt(external) + parseInt(attendance) + parseInt(termwork) + parseInt(internal);

    let subject_percentage = ((subject_total * 100 / parseInt(total_subject_mark))).toFixed(2);

    // console.log("subject_total:" + subject_total)



    let subject_point, subject_grade;

    if (84.5 <= subject_percentage && subject_percentage <= 100) {
        subject_point = 10.00;
        subject_grade = 'AA';
    }
    else if (74.5 <= subject_percentage && subject_percentage <= 84.49) {
        subject_point = 9.00;
        subject_grade = 'AB';
    }
    else if (64.5 <= subject_percentage && subject_percentage <= 74.49) {
        subject_point = 8.00;
        subject_grade = 'BB';
    }
    else if (54.5 <= subject_percentage && subject_percentage <= 64.49) {
        subject_point = 7.00;
        subject_grade = 'BC';
    }
    else if (44.5 <= subject_percentage && subject_percentage <= 54.49) {
        subject_point = 6.00;
        subject_grade = 'CC';
    }
    else if (39.5 <= subject_percentage && subject_percentage <= 44.49) {
        subject_point = 5.00;
        subject_grade = 'CD';
    }
    else {
        subject_point = 0;
        subject_grade = 'FF';
    }

    if (bool_external) {
        if ((parseInt(external) * 100) / parseInt(external_out_of) < 35) {
            subject_point = 0;
            subject_grade = 'FF';
            alert('external rem');
        }
    }

    if (bool_termwork) {
        if ((parseInt(termwork) * 100) / parseInt(termwork_out_of) < 35) {
            subject_point = 0;
            subject_grade = 'FF';
            alert('termwork is not accepted');
        }
    }



    let total_internal = parseInt(internal) + parseInt(attendance);

    let subject_details = {
        name: subject,
        credit: credit,
        internal: total_internal,
        attendance: attendance,
        total_internal: total_internal_mark,
        termwork: termwork,
        total_termwork: termwork_out_of,
        external: external,
        total_external: external_out_of,
        subject_total: subject_total,
        total_mark: total_subject_mark,
        subject_point: subject_point,
        subject_grade: subject_grade,
    }


    let checkuser = all_subjects_details.filter((currentsubject) => {
        return currentsubject.name == subject_details.name
    })

    if (checkuser.length == 0) {
        all_subjects_details.push(subject_details)
    }
    else {
        window.alert("subject already exist");
        return;
    }


    let subject_point_sum = 0;
    let total_subject_point = 0;

    for (let i = 0; i < all_subjects_details.length; i++) {
        subject_point_sum += parseInt(all_subjects_details[i].subject_point) * parseInt(all_subjects_details[i].credit);
        total_subject_point += parseInt(all_subjects_details[i].credit) * 10;
    }
    // console.log(parseInt(subject_point_sum))

    let spi = ((subject_point_sum * 10) / total_subject_point).toFixed(2);


    console.log("subject:" + subject + " credit:" + credit + " internal:" + internal + " termwork: " + termwork + " external: " + external);
    console.log("subject_point:" + subject_point)
    console.log("subject_grade: " + subject_grade)
    console.log("subject_details: " + subject_details)

    console.log("all_subjects_details: " + all_subjects_details)

    console.log("subject_point_sum: " + subject_point_sum)
    console.log("total_subject_point: " + total_subject_point)
    console.log("upadated spi: " + spi)
    console.log()
    console.log("-----------------")
    console.log(index)


    display(index);

    index = parseInt(index) + 1;

    let input_card = document.getElementById('input-card')
    input_card.classList.add('d-none')

    let add_btn = document.getElementById('add_btn')
    add_btn.classList.remove('d-none')

    let spiid = document.getElementById('spi')
    spiid.innerText = spi;

    if (spi >= 8.50 && spi <= 10) {
        spiid.classList.add('bolder', 'green')
    }
    else if (spi >= 7.5 && spi < 8.49) {
        spiid.classList.add('bolder', 'orange')
    }
    else if (spi >= 6.5 && spi < 7.49) {
        spiid.classList.add('bolder', 'tomato')
    }
    else {
        spiid.classList.add('bolder', 'red')
    }


}

function display(i) {


    let dataContainer = document.getElementById('data-container');

    let divsub_data = document.createElement('div')
    divsub_data.classList.add('subject_data', 'flex')
    dataContainer.appendChild(divsub_data)

    let divsub_name = document.createElement('div')
    divsub_name.classList.add('sub_name', 'w-20')
    divsub_name.innerText = all_subjects_details[i].name;
    divsub_data.appendChild(divsub_name)

    let divw_80 = document.createElement('div')
    divw_80.classList.add('w-80')
    divsub_data.appendChild(divw_80)

    let flex1 = document.createElement('div')
    flex1.classList.add('flex')

    let flex2 = document.createElement('div')
    flex2.classList.add('flex', 'mt-4')
    divw_80.appendChild(flex1)
    divw_80.appendChild(flex2)

    let divs_mark = document.createElement('div')
    let divt_mark = document.createElement('div')
    let dive_mark = document.createElement('div')
    divs_mark.innerText = 'internal : ' + all_subjects_details[i].internal + '/' + all_subjects_details[i].total_internal;
    divt_mark.innerText = 'termwork : ' + all_subjects_details[i].termwork + '/' + all_subjects_details[i].total_termwork;
    dive_mark.innerText = 'external : ' + all_subjects_details[i].external + '/' + all_subjects_details[i].total_external;
    divs_mark.classList.add('w-33')
    divt_mark.classList.add('w-33')
    dive_mark.classList.add('w-33')
    flex1.appendChild(divs_mark)
    flex1.appendChild(divt_mark)
    flex1.appendChild(dive_mark)

    let divtotal_mark = document.createElement('div')
    let div_point = document.createElement('div')
    let div_grade = document.createElement('div')
    divtotal_mark.innerText = 'total : '
    div_point.innerText = 'point : '
    div_grade.innerText = 'grade : '
    divtotal_mark.classList.add('w-33')
    div_point.classList.add('w-33')
    div_grade.classList.add('w-33')

    flex2.appendChild(divtotal_mark)
    flex2.appendChild(div_point)
    flex2.appendChild(div_grade)

    let span_total = document.createElement('span')
    let span_point = document.createElement('span')
    let span_grade = document.createElement('span')
    span_point.innerText = all_subjects_details[i].subject_point
    span_grade.innerText = all_subjects_details[i].subject_grade
    span_total.innerText =  all_subjects_details[i].subject_total + '/' + all_subjects_details[i].total_mark ;


    if (all_subjects_details[i].subject_point == 10.00 || all_subjects_details[i].subject_point == 9.00 ) {
        span_point.classList.add('bolder', 'green')
        span_grade.classList.add('bolder', 'green')
    }
    else if (all_subjects_details[i].subject_point == 8.0) {
        span_point.classList.add('bolder', 'orange')
        span_grade.classList.add('bolder', 'orange')
    }
    else if (all_subjects_details[i].subject_point == 7.0) {
        span_point.classList.add('bolder', 'tomato')
        span_grade.classList.add('bolder', 'tomato')
    }
    else {
        span_point.classList.add('bolder', 'red')
        span_grade.classList.add('bolder', 'red')
    }

    div_point.appendChild(span_point)
    div_grade.appendChild(span_grade)
    divtotal_mark.appendChild(span_total)

}

function showinput() {
    let input_card = document.getElementById('input-card')
    input_card.classList.remove('d-none')

    let add_btn = document.getElementById('add_btn')
    add_btn.classList.add('d-none')
}

