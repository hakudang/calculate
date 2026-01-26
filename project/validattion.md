# Sơ đồ Validation 
## Cấu trúc điều kiện If - Else If - Else
### Code mẫu
```js
    if (điều_kiện_1) {
        // chạy khi điều_kiện_1 đúng
        block_1();
    } else if (điều_kiện_2) {
        // chạy khi điều_kiện_1 sai, và điều_kiện_2 đúng
        block_2();
    } else if (điều_kiện_3) {
        // chạy khi điều_kiện_1, điều_kiện_2 sai, và  điều_kiện_3 đúng
        block_3();
    } else {
        // chạy khi TẤT CẢ điều kiện trên đều sai
        block_else();
    }
```
### Sơ đồ mermaid
```mermaid
flowchart TD

Start --> C1

C1{Con_1}
C1 -->|Yes| A1[run block_1] --> End
C1 -->|No| C2

C2{Con_2}
C2 -->|Yes| A2[run block_2] --> End
C2 -->|No| C3

C3{Con_3}
C3 -->|Yes| A3[run block_3] --> End
C3 -->|No| A4[run block_else] --> End

```

## Validation

### Code 01 - JS
```js
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";


buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

const calculate = (btnValue) => {
    const lastChar = output.toString().slice(-1);
    display.focus();
    // Nếu btnValue là "=" và output không rỗng
    if (btnValue === "=" && output !== "") {
        // Nếu output có '%', thay thế bằng '/100' trước, sau đó thực thi chuỗi.
        output = eval(output.replace("%", "/100"));
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        // Nếu nút DEL được nhấn, xóa ký tự cuối cùng khỏi output.
        output = output.toString().slice(0, -1);
    } else {
        // V-04: Xử lý 00 ở đầu chuỗi
        if (output === "" && btnValue === "00") {
            output = "0";
        }
        // V-10 & V-11: Xử lý toán tử ở đầu chuỗi
        else if (output === "" && specialChars.includes(btnValue)) {
            if (btnValue === "-") {
                output += btnValue;  // Cho phép dấu âm (V-11)
            } else {
                return; // Chặn * hoặc / ở đầu (V-10)
            }
        }
        // V-09: Chặn 2 toán tử liên tiếp (BR-02) [2, 3]
        // Nếu phím bấm là toán tử VÀ ký tự cuối cùng cũng là toán tử
        else if (specialChars.includes(btnValue) && specialChars.includes(lastChar)) {
            return; // Không xử lý, giữ nguyên trạng thái (BR-11) [4]
        }
        // Trường hợp thông thường: Cộng dồn giá trị vào chuỗi
        else {
            output += btnValue;
        }
    }
    display.value = output;
}
```
### Code 01- sơ đồ mermaid
```mermaid
flowchart TD

Start --> C1

C1{btnValue is = AND output not empty}
C1 -->|Yes| A1[eval] --> End
C1 -->|No| C2

C2{btnValue is AC}
C2 -->|Yes| A2[output -> empty] --> End
C2 -->|No| C3

C3{btnValue is DEL}
C3 -->|Yes| A3[delete last character] --> End
C3 -->|No| C5

C4{btnValue in specialChars AND lastChar in specialChars}
C4 -->|Yes| End
C4 -->|No| A4[append btnValue to output] --> End

%% Nhánh xử lý V-04
C5{output is empty AND btnValue is '00'}
C5 -->|Yes| A5[output -> '0'] --> End
C5 -->|No| C6

%% Nhánh xử lý V-10, V-11
C6{output is empty AND btnValue in specialChars}
C6 -->|Yes| End
C6 -->|No| C4

```