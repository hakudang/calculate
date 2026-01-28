/**
 * Integration Tests: Mô phỏng tương tác UI và Logic thực tế
 * Dựa trên BR-06 (Thứ tự tính toán) và BR-07 (Chia cho 0)
 */
const runIntegrationTests = async () => {
    console.log("=== Bắt đầu Integration Tests ===\n");

    const getDisplay = () => document.querySelector(".display").value;
    const clickBtn = (val) => document.querySelector(`button[data-value="${val}"]`).click();

    let passed = 0;
    let failed = 0;

    // Test Case 01: Phép tính phức hợp theo thứ tự nhập (BR-06)
    // Mong đợi: 10 - 2 * 3 = (10-2)*3 = 24 (Không phải 4 theo BODMAS)
    clickBtn("AC");
    ["1", "0", "-", "2", "*", "3", "="].forEach(clickBtn);
    const tc01Result = getDisplay();
    if (tc01Result === "24") {
        console.log("✅ TC01 PASSED: 10-2*3 = 24 (left-to-right)");
        passed++;
    } else {
        console.error(`❌ TC01 FAILED: Mong đợi 24, nhận ${tc01Result}`);
        failed++;
    }

    // Test Case 02: Ngăn toán tử liên tiếp và xử lý lỗi (BR-02, BR-11)
    clickBtn("AC");
    ["5", "+", "*", "3", "="].forEach(clickBtn);
    const tc02Result = getDisplay();
    if (tc02Result === "8") {
        console.log("✅ TC02 PASSED: 5+*3 = 8 (bỏ qua toán tử liên tiếp)");
        passed++;
    } else {
        console.error(`❌ TC02 FAILED: Mong đợi 8, nhận ${tc02Result}`);
        failed++;
    }

    // Test Case 03: Xử lý chia cho 0 (BR-07, V-19)
    clickBtn("AC");
    ["8", "/", "0", "="].forEach(clickBtn);
    const tc03Result = getDisplay();
    if (tc03Result === "Error") {
        console.log("✅ TC03 PASSED: 8/0 = Error (chia cho 0)");
        passed++;
    } else {
        console.error(`❌ TC03 FAILED: Mong đợi Error, nhận ${tc03Result}`);
        failed++;
    }

    // Test Case 04: Tự động thêm 0 trước dấu chấm (V-07)
    clickBtn("AC");
    ["."].forEach(clickBtn);
    const tc04Result = getDisplay();
    if (tc04Result === "0.") {
        console.log("✅ TC04 PASSED: . = 0. (tự động thêm 0)");
        passed++;
    } else {
        console.error(`❌ TC04 FAILED: Mong đợi 0., nhận ${tc04Result}`);
        failed++;
    }

    console.log(`\n=== Kết thúc Integration Tests ===`);
    console.log(`📊 Tổng kết: ${passed} passed, ${failed} failed (Total: ${passed + failed})`);
    
    if (failed === 0) {
        console.log("🎉 Tất cả test cases đều PASS!");
    }
};

runIntegrationTests();