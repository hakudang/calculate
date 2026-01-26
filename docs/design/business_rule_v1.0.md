# 業務ルール（Business Rules）

Calculator Application
```
Version : 1.0  
Status  : Draft → To be Frozen
Scope   : All Use Cases
```

## 1. 本書の目的（Mục đích tài liệu）

- Định nghĩa quy tắc nghiệp vụ chi phối hành vi của Calculator.

- Là tiêu chí phán đoán duy nhất khi:

  - Thiết kế logic
  - Implement
  - Viết test case
- Ngăn việc:
  - Dev tự suy diễn
  - QA test mỗi người một kiểu

## 2. 適用範囲（Scope）

- Áp dụng cho toàn bộ:

  - Nhập dữ liệu
  - Xử lý phép tính
  - Hiển thị kết quả

- Áp dụng cho phiên sử dụng hiện tại (không lưu data).

## 3. 用語定義（Terminology）

| Thuật ngữ | Ý nghĩa                                  |
| --------- | ---------------------------------------- |
| 入力文字列     | Chuỗi người dùng đang nhập               |
| 現在値       | Số đang được nhập tại thời điểm hiện tại |
| 演算子       | `+`, `-`, `*`, `/`                       |
| 表示領域      | Vùng hiển thị kết quả                    |
| 無効入力      | Input vi phạm rule                       |

## 4. 業務ルール一覧（Business Rule List）
### BR-01：入力文字種制限

- Chỉ cho phép các ký tự:

  - `0～9`, `00`
  - `.`
  - `+`, `-`, `*`, `/`, `%`

- Ký tự khác → không xử lý

### BR-02：演算子連続入力禁止 - không cho phép nhập toán tử liên tiếp

- Không cho phép nhập 2 toán tử liên tiếp

- Ví dụ:

  - ❌ `5++3`
  - ❌ `10/*2`

- Hệ thống:
  - Bỏ qua toán tử nhập sau

### BR-03：小数点入力制御 - kiểm soát nhập dấu thập phân

- Mỗi số chỉ được chứa 1 dấu `.`

- Ví dụ:

  - ❌ `3.1.5`
  - Dấu `.` thứ 2 → **không xử lý**

### BR-04：先頭演算子制御 - xử lý toán tử đầu chuỗi

- Không cho phép:
  - Bắt đầu chuỗi bằng `*` hoặc `/`
  - Bắt đầu chuỗi bằng `00` xem như số `0`

- Cho phép:
  - làm số âm (optional v1)
    - Ví dụ: `-5+3` → hợp lệ
- Nếu vi phạm → **không xử lý**

### BR-05：等号入力時の処理

- Khi nhấn =:
  - Nếu chuỗi hợp lệ → thực hiện tính toán
  - Nếu chuỗi không hợp lệ → không tính

- Nhấn = nhiều lần:
  - Giữ nguyên kết quả cuối

### BR-06：計算順序

- Phép tính được thực hiện:
  - Theo thứ tự nhập (left-to-right)
- Không áp dụng ưu tiên toán học (BODMAS)

### BR-07：ゼロ除算

- Khi phát sinh chia cho 0:
  - Không thực hiện phép tính
  - Hiển thị thông báo lỗi
  - Không crash hệ thống

### BR-08：DEL操作

- DEL xóa 1 ký tự cuối
- Nếu chuỗi rỗng:
  - Không xử lý

### BR-09：AC操作

- AC:
  - Xóa toàn bộ chuỗi nhập
  - Reset display về trạng thái ban đầu

### BR-10：パーセント計算

- % áp dụng cho giá trị hiện tại
- Quy đổi:
  - `x % `→ `x / 100`
- Không cho phép % liên tiếp

### BR-11：無効入力時の振る舞い ( Invalid Input Handling )

- Khi nhập sai rule:
  - Không update display
  - Không hiển thị lỗi popup
  - Hệ thống tiếp tục hoạt động bình thường

## 5. 共通業務ルール（Common Business Rules）

- 1 lần click → 1 hành động
- Mọi xử lý phải:
  - Deterministic (cùng input → cùng output)
- Không:
  - Lưu lịch sử
  - Undo / redo

## 6. Use Case との対応関係（Traceability）

| UC-ID | Áp dụng Rule        |
| ----- | ------------------- |
| UC-01 | BR-01               |
| UC-02 | BR-02, BR-04        |
| UC-03 | BR-03               |
| UC-04 | BR-05, BR-06, BR-07 |
| UC-05 | BR-09               |
| UC-06 | BR-08               |
| UC-07 | BR-10               |
| UC-08 | BR-11               |

## 7. スコープ外（Out of Scope）

- Scientific rules
- Memory (M+, M-)
- History
- Parentheses ()

## 8. 改訂履歴（Revision History）
| Version | Date       | Description          | Author   |
| ------- | ---------- | -------------------- | -------- |
| 1.0     | 2026-01-25 | Initial Release      | BrSE    |


## 8. NEXT

- UC nói ai làm gì, làm thế nào
- BR nói được phép hay không
- Design / Code chỉ được phép tuân theo BR

👉 Với bộ tài liệu này, bạn có thể:

- Viết Validation Spec
- Viết Test Case
- Review code dev 100% khách quan
- Next step:
  - バリデーション仕様（Validation Spec）
  - テストケース（Test Case）
  - 画面遷移図（Screen Transition Diagram）