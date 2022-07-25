// Variables to hold operands and operator
// Set to empty strings for easily checking when they have not been set
var leftOperand = "";
var rightOperand = "";
var operator = "";
// Boolean to indicate when the value on the screen needs to be overwritten
// When a result is on the screen, and user wants to start a fresh calculation
var clearscreenForOp = false;
// Boolean to indicate there's already a decimal on screen hence disable further decimal input
var decimalPresent = false;

function add(num1, num2){
    return num1+num2;
}
function sub(num1, num2){
    return num1-num2;
}
function div(num1, num2){
    return num1/num2;
}
function mul(num1, num2){
    return num1*num2;
}

function operate(num1, num2, oper){
    let result;
    switch(oper) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = sub(num1, num2);
            break;
        case '*':
            result = mul(num1, num2);
            break;
        case '/':
            if (num2 == 0) {
                // Snarky error to display if division by 0 is tried
                result = "We must not share by 0!"
            } else {
                result = div(num1, num2);
            }
            break;
        default:
            return
    }
    // Truncate long decimals to avoid screen overflow
    if (typeof result != 'string' && result.toString().length > 22) {
        result = result.toPrecision(21);
    }
    return result;
}

// Process +,-,*,/ & =
function getOperator(op) {
    let outputscreen = document.getElementById("result");
    // Reset decimal flag once operator is clicked to allow for decimal on next operand
    decimalPresent = false;
    // If leftOp and operator have not been set yet
    if (leftOperand == "" && operator == "") {
        // Take current display value as leftOp
        leftOperand = outputscreen.value;
        // Check that the operand is not an empty string
        if (leftOperand == "") {
            return;
        } else {
            // Set operator to op that called the function
            operator = op;
            // Set screen to empty, ready for 2nd operand
            outputscreen.value = ""; 
        }
    }  
    // If 1st operand and operator are already set.. get 2nd operand then perform calculation  
    else if (leftOperand != "" && operator != "" && rightOperand == "") {
        // First, ensure clearscreenForOp flag is false to avoid pressing of operator twice when calculator is expecting an operand instead
        if (clearscreenForOp == false) {
            // Get display value as 2nd operand
            rightOperand = outputscreen.value;
            // Check that it is not an empty string
            if (rightOperand == "") {
                return;
            } else {   
                let result;
                // If the operand calling the function is =  
                if (op == "=") {
                    // Perform calculation by passing converted operands to operate and the previous operator
                    result = operate(parseFloat(leftOperand), parseFloat(rightOperand), operator);  
                    // Update display with result                  
                    updateDisplay(result);
                    // Set clearscreen flag so that if the user enter a new digit, it overwrites the result instead of concatenating
                    clearscreenForOp = true;
                    // Reset both operands and operator
                    leftOperand = "";
                    rightOperand = "";
                    operator = "";
                } 
                // if operand is not = sign
                else {
                    // Perform calculation and store the result in 1st operand
                    leftOperand = operate(parseFloat(leftOperand), parseFloat(rightOperand), operator);                    
                    updateDisplay(leftOperand);
                    // Reset 2nd operand
                    rightOperand = "";
                    // Make the operator that called the function the current operator for next calculation
                    operator = op;
                    // Set clearscreen flag so that user overwrites 1st operand when they start typing and typed value is then used as 2nd operand
                    clearscreenForOp = true;
                }                            
            }   
        } else {
            // if clearscreen flag is set, do nothing.. this takes care of cases of pressing operators followed by operator instead of operand
            return;
        }       
    } 
}

function display(num) {
    let outputscreen = document.getElementById("result"); 
    // If clearscreen flag is set, clear screen before displaying the value pressed   
    if (clearscreenForOp) {
        outputscreen.value = ""; 
        // set the flag to false so that next button does not override but rather concatenates      
        clearscreenForOp = false;
    }
    // if the decimal point is the current button pressed
    if (num == ".") {
        // Do nothing if there's already a decimal on screen
        if (decimalPresent) {
            return;
        } else {
            // set the flag to true
            decimalPresent = true;
        }
    }
    // Update the display appropriately
    let currentval = outputscreen.value;
    currentval += num;
    outputscreen.value = currentval;  
}

function del() {
    let outputscreen = document.getElementById("result");
    let currentval = outputscreen.value;
    let stringval = currentval.toString();
    let newval = stringval.slice(0, -1);
    outputscreen.value = newval;
}

function clearscreen() {
    let outputscreen = document.getElementById("result");
    let currentval = outputscreen.value;
    currentval = "";
    outputscreen.value = currentval;
    // Reset operands, operator and flags
    leftOperand = "";
    rightOperand = "";
    operator = "";
    clearscreenForOp = false;
    decimalPresent = false;
}

function updateDisplay(output) {
    let currentdisplay = document.getElementById("result");
    currentdisplay.value = output;
}



