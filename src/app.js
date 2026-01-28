const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

// Operators dùng trong biểu thức (không tính "=" vì "=" là hành động)
const operators = new Set(["%", "*", "/", "-", "+"]);
const splitByOperators = /[+\-*/%]/; // regex để tách phần số hiện tại

let output = "";

buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

function calculate(btnValue) {
    const str = String(output);
    const lastChar = str.slice(-1);
    const lastNumber = str.split(splitByOperators).pop(); // phần số hiện tại

    display.focus();

    // 1) Commands
    if (btnValue === "AC") {
        output = "";
        display.value = output;
        return;
    }

    if (btnValue === "DEL") {
        output = str.slice(0, -1);
        display.value = output;
        return;
    }

    // 2) Evaluate "="
    if (btnValue === "=") {
        if (output === "") return;
        if (operators.has(lastChar) && lastChar !== "%") return; // chặn kết thúc bằng toán tử

        // xử lý nhiều dấu %
        let expr = str.replaceAll("%", "/100");
        
        // BR-06: Tính toán theo thứ tự nhập (left-to-right), không theo BODMAS
        // BR-07: Xử lý chia cho 0
        try {
            // Tách biểu thức thành tokens (số và toán tử)
            const tokens = expr.match(/\d+\.?\d*|[+\-*/]/g);
            if (!tokens || tokens.length === 0) {
                output = "";
                display.value = output;
                return;
            }
            
            let result = parseFloat(tokens[0]);
            
            // Tính từ trái sang phải
            for (let i = 1; i < tokens.length; i += 2) {
                const operator = tokens[i];
                const operand = parseFloat(tokens[i + 1]);
                
                // BR-07: Kiểm tra chia cho 0
                if (operator === "/" && operand === 0) {
                    output = "Error";
                    display.value = output;
                    return;
                }
                
                switch (operator) {
                    case "+": result += operand; break;
                    case "-": result -= operand; break;
                    case "*": result *= operand; break;
                    case "/": result /= operand; break;
                }
            }
            
            output = String(result);
            display.value = output;
        } catch (e) {
            output = "Error";
            display.value = output;
        }
        return;
    }

    // 3) Validation / build expression
    // V-04: '00' ở đầu
    if (output === "" && btnValue === "00") {
        output = "0";
        display.value = output;
        return;
    }

    // V-07: '.' ở đầu => '0.'
    if (output === "" && btnValue === ".") {
        output = "0.";
        display.value = output;
        return;
    }

    // V-10 & V-11: toán tử ở đầu
    if (output === "" && operators.has(btnValue)) {
        if (btnValue === "-") {
            output = "-"; // cho phép số âm
            display.value = output;
        }
        // chặn *, /, +, % ở đầu
        return;
    }

    // V-09: chặn 2 toán tử liên tiếp
    if (operators.has(btnValue) && operators.has(lastChar)) {
        return;
    }

    // V-05, V-06: chặn nhập '.' lần 2 trong cùng 1 số
    if (btnValue === "." && lastNumber.includes(".")) {
        return;
    }

    // Normal append
    output = str + btnValue;
    display.value = output;
}