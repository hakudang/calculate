# Hướng Dẫn Integration Tests

Dự án Calculator

## 1. Hướng dẫn làm Integration Tests
Kiểm thử tích hợp (Integration Tests) trong dự án này tập trung vào việc xác thực sự phối hợp giữa Giao diện người dùng (UI) và Logic xử lý (Calculation & Validation).
- Mục tiêu: Đảm bảo rằng khi người dùng tương tác với các nút bấm trên giao diện, hệ thống xử lý đúng theo các quy tắc nghiệp vụ (Business Rules) và cập nhật vùng hiển thị chính xác.
- Phạm vi: Kiểm tra luồng dữ liệu từ lúc nhấn nút -> Qua bộ lọc Validation -> Đến hàm tính toán -> Hiển thị kết quả lên màn hình.

## 2. Mã nguồn file integration_tests.js
Mã nguồn này mô phỏng hành vi click chuột của người dùng và kiểm tra trạng thái của vùng hiển thị (DOM - Document Object Model).

```js
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
```

## 3. Giải thích các điểm chạm (Integration Points) dựa trên tài liệu

Các "điểm chạm" là nơi các thành phần khác nhau của hệ thống giao tiếp với nhau:
- UI và Validation (V-01 đến V-23): Ngay khi người dùng nhấn nút (UI), hệ thống phải kiểm tra tính hợp lệ theo thời gian thực. Ví dụ: Nhấn . khi chuỗi rỗng sẽ tự động kích hoạt V-07 để hiển thị `0.`.
- Logic tính toán và Hiển thị (FR-02, FR-04): Sau khi nhấn =, hàm tính toán phải xử lý chuỗi và gửi kết quả về vùng Display. Điểm chạm này đảm bảo quy tắc BR-06 (tính từ trái sang phải) được thực thi thay vì quy tắc toán học thông thường.
- Xử lý ngoại lệ và Trạng thái hệ thống (BR-07, BR-11): Khi xảy ra lỗi (như chia cho 0), điểm chạm giữa logic xử lý lỗi và UI phải đảm bảo ứng dụng không bị crash và hiển thị thông báo lỗi đúng như V-19 đã định nghĩa.

## 4. Hướng dẫn thực hiện Integration Tests
### 4.1. Kiểm thử tích hợp thủ công (Manual Integration Testing)
Dựa trên tài liệu Test Case Specification:
1. Chuẩn bị: Mở ứng dụng trên trình duyệt (Chrome/Edge) ở trạng thái ban đầu.
2. Thực hiện:
    - Nhập các chuỗi thao tác phức tạp có trong tài liệu như TC-18 (10 - 2 * 3).
    - Thử nghiệm các trường hợp biên như nhấn liên tiếp toán tử hoặc dấu chấm để xem UI có đứng vững theo BR-02 và BR-03 hay không.
3. Xác nhận: Đối chiếu giá trị trên màn hình với cột "Kết quả mong đợi" trong Test Case List.

### 4.2. Kiểm thử tích hợp tự động (Automated Integration Testing)
1. Cài đặt: Nhúng file integration_tests.js vào cuối file index.html hoặc chạy trực tiếp trong Console của trình duyệt.
2. Thực thi: Gọi hàm runIntegrationTests().
3. Báo cáo: Kiểm tra các dòng Log trong Console. Nếu có bất kỳ dòng "Thất bại" (Fail) nào, cần truy xuất ngược : từ TC-ID -> Validation ID và Business Rule, để xác định lỗi nằm ở UI hay Logic xử lý.