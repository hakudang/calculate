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
### Code 
```js
const calculate = (btnValue) => {
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
        // Nếu output rỗng và nút là specialChars thì thoát
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }
    display.value = output;
}
```

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
C3 -->|No| C4

C4{output is empty AND btnValue in specialChars}
C4 -->|Yes| End
C4 -->|No| A4[append btnValue to output] --> End

```