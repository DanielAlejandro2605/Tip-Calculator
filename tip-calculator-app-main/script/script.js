let document_innerHTML = document.body.innerHTML;

function resetAutomatic(){
    document.body.innerHTML = document_innerHTML;    
}
function mainFunction(){
    let array = getValues();
    let bill_total = array[0];
    let percentage = array[1];
    let number_of_people = array[2];
    
    if(verifyValues(bill_total, percentage, number_of_people)){
        bill_total = Number(bill_total);
        percentage = Number(percentage);
        number_of_people = Number(number_of_people);
        tipCalculator(bill_total, percentage, number_of_people);

        setTimeout(() => {
            resetAutomatic();
        }, 3500);
    } else{
        setTimeout(() => {
            resetAutomatic();
        }, 4000);
    }
}
function putValues(tip_amount, total_per_person){
    let div_tip_amount = document.getElementById('tip_amount_container');
    let div_total_per_person = document.getElementById('total_per_person_container');
    div_tip_amount.innerHTML = "$" + myRound(tip_amount, 2);
    div_total_per_person.innerHTML = "$" + total_per_person;
}
function tipCalculator(bill_total, percentage, number_of_people){
    let tip_amount = ((bill_total * percentage) / 100 * 2 * 0.1);
    let total_per_person = (bill_total / number_of_people + tip_amount).toFixed(2);
    putValues(tip_amount, total_per_person);
}
function verifyValues(bill_total, percentage, number_of_people){
    let container_bill_total = document.getElementById('bill_total_container');
    let container_percentage = document.getElementById('percentage_container');
    let container_people = document.getElementById('people_container');
    let flag = 0;
    // Verify if there are correct values
    if(Object.is(NaN, Number(bill_total))){
        createMessage(container_bill_total, "Must be a number(non zero)");
        flag = 1;
    }
    if(Object.is(NaN, Number(percentage))){
        createMessage(container_percentage, "Must be a number(non zero)");
        flag = 1;
    }
    if(Object.is(NaN, Number(number_of_people))){
        createMessage(container_people, "Must be a number(non zero)");
        flag = 1;
    }

    if(flag == 1){
        return false;
    }
    return true;

}

function getValues(){
    let percentage_value;
    let custom_value = document.getElementById('custom').value;
    if(custom_value != ""){
        percentage_value = custom_value;
    } else{
        percentage_value = getPercentageValue();
    }
    let bill_total_value = document.getElementById('fname').value;
    let number_of_people_value = document.getElementById('email').value;
    return [bill_total_value, percentage_value, number_of_people_value];   
}

function getPercentageValue(){
    let percentage_aux;
    let button_selected_value = document.querySelector("input[type='radio'][name='buttonGroup']:checked").value;
    if(button_selected_value != undefined){
        percentage_aux = button_selected_value;
    }
    return percentage_aux;
}
function createMessage(elem, html) {
    let paragraph = elem.firstElementChild;
    let original_html = paragraph.innerHTML;
    let span = `<span>${html}</span>`;
    paragraph.innerHTML = paragraph.innerHTML + span; 
    setTimeout(() => {
        paragraph.innerHTML = original_html;
    }, 4000);
}   

function myRound(num, dec) {
    let exp = Math.pow(10, dec || 2); // 2 decimales por defecto
    return parseInt(num * exp, 10) / exp;
}