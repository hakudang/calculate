# バリデーション仕様（Validation Specification）

Calculator Application

```
Version : 1.0  
Status  : Draft → To be Frozen
Scope   : Frontend Input Validation
```

## 1. 本書の目的

- Định nghĩa toàn bộ rule kiểm tra input cho Calculator.

- Là tiêu chuẩn thống nhất để:
  - Dev implement validation
  - QA viết test case
- Tránh tình trạng:
  - “Dev hiểu một kiểu”
  - “QA test một kiểu”

## 2. 適用範囲

- Áp dụng cho:
  - Nhập số
  - Nhập toán tử
  - Nhập dấu .
  - Thực hiện phép tính
- Áp dụng real-time (ngay tại thời điểm người dùng thao tác).

## 3. バリデーション一覧（Validation List）
### 3.1 Ký tự nhập (Character Validation)

| ID   | Nội dung           | Điều kiện                     | Kết quả    |
| ---- | ------------------ | ----------------------------- | ---------- |
| V-01 | Ký tự hợp lệ       | `0–9`, `00`, `.`, `+ - * / %` | Cho phép   |
| V-02 | Ký tự không hợp lệ | Ký tự khác                    | Không nhận |

### 3.2 Nhập số (Number Validation)

| ID   | Nội dung | Điều kiện           | Kết quả          |
| ---- | -------- | ------------------- | ---------------- |
| V-03 | Nhập số  | Bất kỳ số 0–9, 00  | Append vào chuỗi |
| V-04 | Nhập 00  | Đầu chuỗi           | Hiển thị 0       |

### 3.3 Dấu thập phân (Decimal Validation)

| ID   | Nội dung | Điều kiện               | Kết quả          |
| ---- | -------- | ----------------------- | ---------------- |
| V-05 | Nhập .   | Số hiện tại chưa có .   | Cho phép         |
| V-06 | Nhập .   | Số hiện tại đã có .     | Không xử lý      |
| V-07 | Nhập .   | Chuỗi rỗng              | Tự động thành 0. |

### 3.4 Toán tử (Operator Validation)

| ID   | Nội dung | Điều kiện           | Kết quả                  |
| ---- | -------- | ------------------- | ------------------------ |
| V-08 | Nhập toán tử | Ký tự cuối là số | Cho phép                 |
| V-09 | Nhập toán tử | Ký tự cuối là toán tử | Không xử lý          |
| V-10 | Nhập * / | Ở đầu chuỗi         | Không xử lý              |
| V-11 | Nhập -   | Ở đầu chuỗi         | Cho phép (số âm – optional v1) |

### 3.5 Phần trăm (Percentage Validation)

| ID   | Nội dung | Điều kiện           | Kết quả          |
| ---- | -------- | ------------------- | ---------------- |
| V-12 | Nhập %   | Có số hiện tại      | Chuyển x → x/100 |
| V-13 | Nhập %   | Sau %               | Không xử lý      |
| V-14 | Nhập %   | Chuỗi rỗng          | Không xử lý      |

### 3.6 Thực hiện phép tính = (Execution Validation)

| ID   | Nội dung | Điều kiện               | Kết quả          |
| ---- | -------- | ----------------------- | ---------------- |
| V-15 | Nhấn =   | Chuỗi hợp lệ            | Tính toán        |
| V-16 | Nhấn =   | Chuỗi kết thúc bằng toán tử | Không tính   |
| V-17 | Nhấn =   | Chuỗi rỗng              | Không xử lý      |
| V-18 | Nhấn = nhiều lần | Không input mới   | Giữ kết quả      |

### 3.7 Chia cho 0 (Zero Division)

| ID   | Nội dung | Điều kiện           | Kết quả          |
| ---- | -------- | ------------------- | ---------------- |
| V-19 | Chia cho 0 | /0                | Hiển thị lỗi     |
| V-20 | Chia cho 0 | Bất kỳ trường hợp  | Không crash      |

### 3.8 Xóa dữ liệu (Delete / Clear)

| ID   | Nội dung | Điều kiện           | Kết quả          |
| ---- | -------- | ------------------- | ---------------- |
| V-21 | Nhấn DEL | Chuỗi có ký tự      | Xóa 1 ký tự      |
| V-22 | Nhấn DEL | Chuỗi rỗng          | Không xử lý      |
| V-23 | Nhấn AC  | Bất kỳ trạng thái   | Reset toàn bộ    |

## 4. 共通バリデーションルール（Common Rules）

- Validation được thực hiện:
  - Ngay khi người dùng thao tác
- Khi input không hợp lệ:
  - Không update display
  - Không popup lỗi
  - Không dừng ứng dụng
- Hệ thống phải:
  - Deterministic
  - Không phụ thuộc trạng thái ngoài

## 5. Business Rule との対応（Traceability）

| Business Rule | Validation ID |
| ------------- | ------------- |
| BR-01         | V-01, V-02    |
| BR-02         | V-09          |
| BR-03         | V-05, V-06    |
| BR-04         | V-10, V-11    |
| BR-05         | V-15 ～ V-18   |
| BR-07         | V-19, V-20    |
| BR-08         | V-21, V-22    |
| BR-09         | V-23          |
| BR-10         | V-12 ～ V-14   |

## 6. スコープ外

- Validation cho scientific mode
- Parentheses ()
- Memory function
- History

## 7. NEXT

- Validation Spec = luật phòng thủ
- Code sai → QA bắt được
- QA bắt sai → soi lại Validation

👉 Bộ tài liệu này + UC + BR = đủ chuẩn dự án Nhật.

- Bước tiếp theo rất hợp lý
- Bạn nên làm tiếp 1 trong 2:
- テストケース仕様書（Test Case Spec）
- 画面遷移図（Screen Transition Diagram）