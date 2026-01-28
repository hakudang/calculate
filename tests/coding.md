# CODING

## HTML - index.html
```html
<!DOCTYPE html>
<!-- YouTube & Website - CodingLab -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator in HTML CSS & JavaScript</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <input type="text" class="display" />

      <div class="buttons">
        <button class="operator" data-value="AC">AC</button>
        <button class="operator" data-value="DEL">DEL</button>
        <button class="operator" data-value="%">%</button>
        <button class="operator" data-value="/">/</button>

        <button data-value="7">7</button>
        <button data-value="8">8</button>
        <button data-value="9">9</button>
        <button class="operator" data-value="*">*</button>

        <button data-value="4">4</button>
        <button data-value="5">5</button>
        <button data-value="6">6</button>
        <button class="operator" data-value="-">-</button>

        <button data-value="1">1</button>
        <button data-value="2">2</button>
        <button data-value="3">3</button>
        <button class="operator" data-value="+">+</button>

        <button data-value="0">0</button>
        <button data-value="00">00</button>
        <button data-value=".">.</button>
        <button class="operator" data-value="=">=</button>
      </div>
    </div>

    <script src="app.js"></script>
    <script src="../tests/unit_tests_v1.0.js"></script>
  </body>
</html>

```

## CSS - style.css
```css
/* Import Google font - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    height: 100vh; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    background: #e0e3eb;
}
.container {
    position: relative;
    max-width: 300px;
    width: 100%;
    border-radius: 12px;
    padding: 20px 20px 20px;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
}
.display {
    height : 80px;
    width : 100%;
    outline: none;
    border : 1px solid #2f9fff;
    border-radius: 6px;
    padding: 20px;
    text-align: right;
    margin-bottom: 10px;
    font-size: 25px;
    color: #000e1a;
    pointer-events: none;
}
.buttons {
    display: grid;
    grid-gap : 10px;
    grid-template-columns: repeat(4, 1fr); /* 4 cột, mỗi cột chiếm 1 phần bằng nhau */
}

.buttons button {
    padding : 10px;
    border-radius: 6px;
    border: none;
    font-size: 20px;
    cursor: pointer;
    background-color: #eee;
}

.buttons button:active {
    transform: scale(0.95);
}
.operator {
    color: #2f9fff;
}
```

## JavaScript - app.js
```javascript
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
        const expr = str.replaceAll("%", "/100");
        output = String(eval(expr)); // (giữ nguyên cách bạn đang làm)
        display.value = output;
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
```