# Calculator Application
```text
version: 1.0
status : Draft → To be Frozen
Date : 25/01/2026
```
## 1. Giới thiệu dự án
Calculator Application là một ứng dụng máy tính trực quan, đơn giản, được thiết kế để thực hiện các phép tính cơ bản hàng ngày trên trình duyệt web. Dự án đóng vai trò là một ứng dụng mẫu (sample app) để demo UI/UX, đào tạo nội bộ và làm nền tảng cho các tính năng nâng cao trong tương lai.
## 2. Đối tượng sử dụng
- Người dùng phổ thông, học sinh/sinh viên, và nhân viên văn phòng.
- Người dùng trên nền tảng Mobile và Web cần thực hiện tính toán nhanh.
## 3. Các tính năng chính
Hệ thống cung cấp giao diện một màn hình duy nhất với các chức năng chính:
- Nhập liệu: Hỗ trợ các số (0-9, 00), dấu chấm thập phân (.) và các toán tử (+, -, *, /, %).
- Thực hiện phép tính (=): Tính toán kết quả dựa trên chuỗi đã nhập.
- Xóa dữ liệu (AC): Reset toàn bộ màn hình về trạng thái ban đầu.
- Xóa ký tự (DEL): Xóa một ký tự cuối cùng trong chuỗi nhập.
- Phần trăm (%): Quy đổi giá trị hiện tại (x% = x/100).
## 4. Quy tắc nghiệp vụ & Logic tính toán (Business Rules)
Để đảm bảo tính nhất quán, hệ thống tuân thủ các quy tắc nghiêm ngặt sau:
- Thứ tự tính toán: Phép tính được thực hiện theo thứ tự nhập từ trái sang phải (Left-to-right), không áp dụng quy tắc ưu tiên toán học BODMAS.
- Xử lý chia cho 0: Hệ thống không thực hiện phép tính, hiển thị thông báo lỗi và đảm bảo không bị crash.
- Kiểm soát nhập liệu (Validation):
    - Không cho phép nhập 2 toán tử liên tiếp (ví dụ: ++, /*).
    - Mỗi số chỉ được chứa tối đa một dấu chấm thập phân.
    - Không bắt đầu chuỗi bằng các toán tử * hoặc /.
- Xử lý lỗi nhập liệu: Khi người dùng nhập sai quy tắc, hệ thống sẽ âm thầm bỏ qua (không xử lý) thay vì hiển thị popup lỗi, nhằm đảm bảo trải nghiệm người dùng mượt mà.
## 5. Đặc tính kỹ thuật
- Nền tảng: Ứng dụng độc lập (Standalone), chạy trên trình duyệt Web (Chrome, Edge, Mobile browser).
- Công nghệ: Không sử dụng backend, không kết nối mạng và không cần database.
- Hiệu suất: Thời gian phản hồi cho mỗi thao tác ≤100ms.
- Quyền riêng tư: Không lưu trữ lịch sử tính toán, không yêu cầu đăng nhập và không gửi dữ liệu ra server.
## 6. Phạm vi ngoài (Out of Scope)
Phiên bản hiện tại (v1.0) không hỗ trợ:
- Các phép tính khoa học (sin, cos, căn bậc hai...).
- Bộ nhớ (M+, M-) và dấu ngoặc đơn.
- Lưu lịch sử tính toán hoặc xuất dữ liệu.
- Tùy biến giao diện (themes) và đa ngôn ngữ.
## 7. Cấu trúc tài liệu dự án
Dự án được quản lý chặt chẽ thông qua hệ thống tài liệu có tính truy vết cao (Traceability):
- Mục đích (Goal): Client Requirements → System Requirements.
- Logic: Business Rules → Use Case Specification.
- Xác thực: Validation Specification → Test Case Specification.

## 8. Tổ chức cây thư mục
```text
/ calculator
  / docs
    / requirements
      - client_requirements_v1.0.md
      - system_requirements_v1.0.md
    / design
      - business_rule_v1.0.md
      - usecase_spec_v1.0.md
      - validation_spec_v1.0.md
      - testcase_spec_v1.0.md
  / src
    / components
    / styles
    - index.html
    - app.js
    - styles.css
  / tests
    - unit_tests.js
    - integration_tests.js
  - README.md
```