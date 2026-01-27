# Sơ đồ Validation 
```text
version: 1.1
status : Draft → To be Frozen
```

## 1. Code - js
```js
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

## 2. Mermaid Diagram
```mermaid
flowchart TD
Start --> C_AC{btnValue is 'AC'}

%% 1) Commands
C_AC -->|Yes| A_AC[output = '' ] --> U[display.value = output] --> End
C_AC -->|No| C_DEL{btnValue is 'DEL'}
C_DEL -->|Yes| A_DEL[delete last char] --> U --> End
C_DEL -->|No| C_EQ{btnValue is '='}

%% 2) Evaluate "="
C_EQ -->|Yes| C_EQ0{output is empty}
C_EQ0 -->|Yes| End
C_EQ0 -->|No| C_EQ1{operators has lastChar AND lastChar != '%'}
C_EQ1 -->|Yes| End
C_EQ1 -->|No| A_EQ[evaluate exp] --> U --> End

%% 3) Validation / build expression
C_EQ -->|No| C_00{output is empty AND btnValue is '00'}
C_00 -->|Yes| A_00[output = '0'] --> U --> End
C_00 -->|No| C_DOT0{output is empty AND btnValue is '.'}
C_DOT0 -->|Yes| A_DOT0[output = '0.'] --> U --> End
C_DOT0 -->|No| C_OP0{output is empty AND operators has btnValue}
%% Operator at start (V-10 & V-11)
C_OP0 -->|Yes| C_NEG{btnValue is '-'}
C_NEG -->|Yes| A_NEG[output = '-'] --> U --> End
C_NEG -->|No| End

%% Consecutive operators (V-09)
C_OP0 -->|No| C_2OP{operators has btnValue AND operators has lastChar}
C_2OP -->|Yes| End
C_2OP -->|No| C_DOT2{btnValue is '.' AND lastNumber contains '.'}
%% Double dot in same number (V-05, V-06)
C_DOT2 -->|Yes| End
C_DOT2 -->|No| A_APP[output += btnValue] --> U --> End

```
## 3. 改訂履歴（Revision History）
| Version | Date       | Description          | Author   |
| ------- | ---------- | -------------------- | -------- |
| 1.0     | 2026-01-25 | Initial Release      | BrSE Dang   |
| 1.1     | 2026-01-27 | separate Commands, Evaluate and validation to improve clarity | BrSE Dang   |