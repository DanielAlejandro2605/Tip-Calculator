// Getting the values for perform the operation

// See if there's a button selected:
let aux;
let button_selected;
let percentage_options = document.getElementById('percentage_options');

percentage_options.onclick = function(event){
    let button = event.target.closest('button');
    if(!button) return;
    if(!percentage_options.contains(button)) return;
    addClassSelected(button);
}
function addClassSelected(button){
    if(button_selected){
        button_selected.classList.remove('selected');
    }
    button_selected = button;
    button_selected.classList.add('selected');
    aux = button_selected.innerHTML;
}

// Create the event for lauch the calculation    
let action_button = document.getElementById("action_button");

action_button.onclick = function(){
    let arrayData = gettingValuesReady();
    let bill_total = arrayData[0];
    let number_of_people = arrayData[1];
    let percentage = arrayData[2];

    // Performing the operation
    let tip_amount = (bill_total * percentage) / 100 * 2 * 0.1;
    let div_tip_amount = document.getElementById('tip_amount');
    div_tip_amount.innerHTML = myRound(tip_amount, 2);

    let total_per_person = (bill_total / number_of_people + tip_amount).toFixed(2);
    let div_total_per_person = document.getElementById('total_person');
    div_total_per_person.innerHTML = total_per_person;
};

// Getting the values ready for operation
function gettingValuesReady(){
    let bill_total = document.getElementById("bill_total").value; 
    let number_of_people = document.getElementById("number_of_people").value;
    verifyBillTotalField(bill_total);
    verifyNumberOfPeopleField(number_of_people);
    bill_total = Number(bill_total);
    number_of_people = Number(number_of_people);
    let percentage = aux.match(/\d+/g);

    return [bill_total, number_of_people, percentage];
}
// Function to verify the value of bill total field
function verifyBillTotalField(bill_total){
    if(bill_total == ""){
        alert('Handling the error of bill total');
    }
}

// Function to verify the value of number of people field
function verifyNumberOfPeopleField(number_of_people){
    if(number_of_people == ""){
        alert("Handling the error of number of people!")
    }
}
// Function to round the values
function myRound(num, dec) {
    let exp = Math.pow(10, dec || 2); // 2 decimales por defecto
    return parseInt(num * exp, 10) / exp;
}