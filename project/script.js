const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";


buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

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