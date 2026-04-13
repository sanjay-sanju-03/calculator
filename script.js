let display = document.getElementById("display");

function append(value) {
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        
        // Validate expression
        if (!expression) {
            display.value = "";
            return;
        }
        
        // Check for invalid characters
        if (!/^[\d+\-*/.()]+$/.test(expression)) {
            display.value = "Error";
            return;
        }
        
        // Use Function constructor instead of eval for safer evaluation
        let result = Function('"use strict"; return (' + expression + ')')();
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

// Allow keyboard input
document.addEventListener("keydown", function(event) {
    const key = event.key;
    
    if (key >= "0" && key <= "9") {
        append(key);
    } else if (key === "+") {
        append("+");
    } else if (key === "-") {
        append("-");
    } else if (key === "*") {
        append("*");
    } else if (key === "/") {
        event.preventDefault();
        append("/");
    } else if (key === ".") {
        append(".");
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "c" || key === "C") {
        clearDisplay();
    } else if (key === "Escape") {
        clearDisplay();
    }
});