# 顧客要求書（Client Requirements）

Calculator Application

```
Version : 1.0  
Status  : Draft  
Owner   : Client  
```

## 1. システム構築の目的（Mục đích xây dựng hệ thống）

- Xây dựng ứng dụng máy tính đơn giản, trực quan, dùng cho các phép tính cơ bản hàng ngày.
- Ưu tiên dễ sử dụng, thao tác nhanh, không gây nhầm lẫn cho người dùng phổ thông.
- Là bài toán mẫu (sample app) để:
  - Demo UI/UX
  - Đào tạo nội bộ 
  - Làm nền tảng mở rộng cho các chức năng nâng cao trong tương lai

## 2. 利用対象者（Đối tượng sử dụng）

- Người dùng phổ thông
- Học sinh / sinh viên
- Nhân viên văn phòng
- Người dùng mobile / web cần tính nhanh

👉 Không yêu cầu kiến thức kỹ thuật.

## 3. 利用シーン（Kịch bản sử dụng）

- Tính toán nhanh các phép:
  - Cộng, trừ, nhân, chia
  - Phần trăm (%)
- Kiểm tra kết quả tức thì khi:
    - Mua sắm
    - Học tập
    - Công việc văn phòng
- Sử dụng trên:
  - Trình duyệt web
  - Màn hình cảm ứng / chuột

## 4. 要求事項（Yêu cầu từ phía khách hàng）
### 4.1 Chức năng cơ bản

- Các nút số:
  - `0 ～ 9`, `00`, `.`
- Các phép toán:
  - `+`, `-`, `*`, `/`
- Nút chức năng:
  - `AC` : Xóa toàn bộ
  - `DEL` : Xóa 1 ký tự cuối
  - `%` : Phép tính phần trăm
  - `=` : Hiển thị kết quả

### 4.2 Hành vi mong muốn

- Hiển thị chuỗi nhập và kết quả trên màn hình chính
- Phép tính được thực hiện theo thứ tự nhập
- Nhấn = nhiều lần → giữ nguyên kết quả cuối
- Không cho nhập chuỗi sai logic (ví dụ ++, ..)

## 5. 非機能的要求（Yêu cầu phi chức năng – góc nhìn khách hàng）

- Giao diện:
  - Đơn giản
  - Nút bấm lớn, rõ ràng
  - Phù hợp cả desktop & mobile

- Tốc độ:
  - Phản hồi ngay lập tức

- Độ ổn định:
  - Không bị treo khi nhập sai

- Trải nghiệm:
  - Không quảng cáo
  - Không popup gây phiền

## 6. データに関する要求（Yêu cầu về dữ liệu）

- Không yêu cầu:
  - Đăng nhập
  - Lưu tài khoản

- Dữ liệu:
  - Chỉ xử lý tạm thời trong phiên sử dụng
  - Không cần lưu lịch sử (v1)

- Không gửi dữ liệu ra server

👉 Ưu tiên privacy tuyệt đối.

## 7. 制約条件（Điều kiện ràng buộc）

- Chạy độc lập (standalone)
- Không phụ thuộc backend
- Không yêu cầu kết nối mạng
- Phải hoạt động ổn định trên:
  - Chrome
  - Edge
  - Mobile browser
## 8. スコープ外（Ngoài phạm vi）

- Các phép toán nâng cao:
  - Căn bậc hai
  - Lũy thừa
  - Log, sin, cos…
- Lịch sử tính toán
- Chế độ khoa học (scientific mode)
- Lưu kết quả, export dữ liệu
- Tùy biến theme / màu sắc

## 9. 成果物イメージ（Hình dung kết quả）

- 1 màn hình duy nhất:
  - Vùng hiển thị kết quả phía trên
  - Bàn phím số + toán tử phía dưới

- Người dùng:
  - Mở app
  - Nhập phép tính
  - Nhận kết quả ngay
  - Không cần hướng dẫn

👉 “Mở lên là dùng được ngay” là tiêu chí thành công.

## 10. 改訂履歴（Lịch sử chỉnh sửa）
| Version | Date       | Description          | Author   |
| ------- | ---------- | -------------------- | -------- |
| 1.0     | 2026-01-25 | 初版作成             | Client   |