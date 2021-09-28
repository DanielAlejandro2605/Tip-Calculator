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
    // Reset action
    if(action_button.innerHTML == "Reset"){
        resetValues();
        // Changing the HTML of the button action
        action_button.innerHTML = "Enter";
    } else if(action_button.innerHTML == "Enter"){
        tipCalculator();
        // Changing the HTML of the button action
        action_button.innerHTML = "Reset";
    }
};

// Function to reset the values
function resetValues(){
    document.getElementById("bill_total").value = "";
    document.getElementById("number_of_people").value = "";
    button_selected.classList.remove('selected');
}
// Function to perform the operation
function tipCalculator(){
    let arrayData = gettingValuesReady();
    let bill_total = arrayData[0];
    let number_of_people = arrayData[1];
    let percentage = arrayData[2];

    // Compute tip amount
    let tip_amount = (bill_total * percentage) / 100 * 2 * 0.1;
    let div_tip_amount = document.getElementById('tip_amount');
    // Compute the total per person
    let total_per_person = (bill_total / number_of_people + tip_amount).toFixed(2);
    let div_total_per_person = document.getElementById('total_person');
    // Putting the values into the page
    div_tip_amount.innerHTML = myRound(tip_amount, 2);
    div_total_per_person.innerHTML = total_per_person;
}
// Getting the values ready for operation
function gettingValuesReady(){
    let bill_total = document.getElementById("bill_total"); 
    let number_of_people = document.getElementById("number_of_people");
    
    // let promise = new Promise((resolve, reject) => {

    // })
    bill_total = verifyBillTotalField(bill_total);
    number_of_people = verifyNumberOfPeopleField(number_of_people);
    let percentage = aux.match(/\d+/g);

    return [bill_total, number_of_people, percentage];
}
// Function to verify the value of bill total field
function verifyBillTotalField(bill_total){
    // Verify if there is not value.
    if(bill_total.value == ""){
        createMessage(bill_total, "Missing bill total value");
        return;
    } // Verify if there's a correct value.
    else if(Object.is(NaN, Number(bill_total.value))){
        createMessage(bill_total, "Bill total must be a number");
        return;
    }

    return Number(bill_total.value);
}

// Function to verify the value of number of people field
function verifyNumberOfPeopleField(number_of_people){
    // Verify if there is not value.
    if(number_of_people.value == ""){
        createMessage(number_of_people, "Missing the number of people value")
        return;
    }
    // Verify if there's a correct value.
    else if(Object.is(NaN, Number(number_of_people.value))){
        createMessage(number_of_people, "Number of people must be a number");
        return;
    }
    return Number(number_of_people.value);
}

// Function to create message alerts
function createMessage(elem, html) {
    // create message element
    let message = document.createElement('div');
    // alert(elem.parentNode);
    // elem.parentNode.style.backgroundColor = 'red';
    // better to use a css class for the style here
    message.style.cssText = "position:fixed; color: red";
  
    // assign coordinates, don't forget "px"!
    let coords = elem.getBoundingClientRect();
  
    message.style.left = coords.left + 40 + "px";
    //message.style.top = coords.bottom + "px";
    message.classList.add('message');
    message.innerHTML = html;
    elem.parentNode.append(message);
}   
  
// Function to round the values
function myRound(num, dec) {
    let exp = Math.pow(10, dec || 2); // 2 decimales por defecto
    return parseInt(num * exp, 10) / exp;
}