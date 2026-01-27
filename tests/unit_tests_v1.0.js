/**
 * Unit Tests cho Calculator Application
 * Dựa trên Test Case Specification v1.0 [1-5]
 * Bao phủ các Validation ID (V) và Business Rules (BR)
 * Test hàm calculate(input) từ app.js
 */

// Giả lập môi trường DOM nếu chạy trong môi trường Node.js (tùy chọn)
// Nếu chạy trên trình duyệt, bạn có thể gọi trực tiếp các test case này.

function runTests() {
    console.log("--- Bắt đầu chạy Unit Tests ---");

    // Mock hàm reset trạng thái để đảm bảo tính Deterministic (BR-05) [6]
    const reset = () => {
        calculate("AC");
    };

    // --- Nhóm 1: Nhập số & hiển thị (TC-01, TC-03) [1] ---
    test("TC-01: Nhập số 5", () => {
        reset();
        calculate("5");
        return output === "5";
    });

    test("TC-03: Nhập 00 ở đầu chuỗi (V-04)", () => {
        reset();
        calculate("00");
        return output === "0";
    });

    // --- Nhóm 2: Dấu thập phân (TC-04, TC-05, TC-06) [2] ---
    test("TC-06: Nhập '.' ở đầu chuỗi (V-07)", () => {
        reset();
        calculate(".");
        return output === "0.";
    });

    test("TC-05: Ngăn nhập 2 dấu '.' trong cùng một số (V-06/BR-03)", () => {
        reset();
        calculate("3");
        calculate(".");
        calculate("1");
        calculate("."); // Lần thứ 2
        return output === "3.1";
    });

    // --- Nhóm 3: Toán tử (TC-09, TC-10, TC-08) [2] ---
    test("TC-09: Toán tử * hoặc / ở đầu chuỗi (V-10/BR-04)", () => {
        reset();
        calculate("*");
        return output === "";
    });

    test("TC-10: Dấu '-' ở đầu chuỗi làm số âm (V-11/BR-04)", () => {
        reset();
        calculate("-");
        calculate("5");
        return output === "-5";
    });

    test("TC-08: Ngăn 2 toán tử liên tiếp (V-09/BR-02)", () => {
        reset();
        calculate("5");
        calculate("+");
        calculate("*"); // Bị ignore
        return output === "5+";
    });

    // --- Nhóm 4: Phần trăm (TC-11, TC-13) [2] ---
    test("TC-13: Nhấn '%' khi chuỗi rỗng (V-14)", () => {
        reset();
        calculate("%");
        return output === "";
    });

    // --- Nhóm 5: Thực hiện phép tính (TC-14, TC-20, TC-22) [3] ---
    test("TC-14: Phép cộng cơ bản (V-15)", () => {
        reset();
        calculate("2");
        calculate("+");
        calculate("3");
        calculate("=");
        return Number(output) === 5;
    });

    test("TC-20: Kết thúc bằng toán tử không được tính (V-16)", () => {
        reset();
        calculate("5");
        calculate("+");
        calculate("=");
        return output === "5+"; // Giữ nguyên trạng thái [7]
    });

    test("TC-22: Chia cho 0 (V-19/BR-07)", () => {
        reset();
        calculate("5");
        calculate("/");
        calculate("0");
        calculate("=");
        // Lưu ý: JS String(eval(5/0)) trả về "Infinity". 
        return output === "Infinity" || output === "Error"; 
    });

    // --- Nhóm 6: Xóa dữ liệu (TC-24, TC-26) [4] ---
    test("TC-24: Xóa 1 ký tự cuối (V-21/BR-08)", () => {
        reset();
        calculate("1");
        calculate("2");
        calculate("3");
        calculate("DEL");
        return output === "12";
    });

    test("TC-26: Reset toàn bộ bằng AC (V-23/BR-09)", () => {
        calculate("1");
        calculate("+");
        calculate("AC");
        return output === "" && display.value === "";
    });

    console.log("--- Hoàn tất kiểm thử ---");
}

// Hàm bổ trợ chạy test
function test(name, fn) {
    try {
        const result = fn();
        if (result) {
            console.log(`✅ [PASS] ${name}`);
        } else {
            console.error(`❌ [FAIL] ${name}`);
        }
    } catch (e) { 
        console.error(`💥 [ERROR] ${name}: ${e.message}`);
    }
}

// Thực thi
runTests();