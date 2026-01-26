# テストケース仕様書（Test Case Specification）

Calculator Application

```
Version : 1.0  
Status  : Draft → To be Frozen
Scope   : Frontend Functional Test
```

## 1. 本書の目的

- Định nghĩa toàn bộ test case để xác nhận:

  - Chức năng
  - Quy tắc nghiệp vụ
  - Validation

- Là tài liệu chính thức cho:

  - QA thực thi test
  - Dev fix bug
  - PM/Khách hàng accept kết quả

## 2. テスト対象

- Calculator Application (1 screen)
- Input bằng click / touch

## 3. テスト前提条件（Preconditions）

- Ứng dụng đã load thành công
- Không có dữ liệu tồn tại trước
- Màn hình ở trạng thái initial

## 4. テストケース一覧（Test Case List）
### 4.1 Nhập số & hiển thị

| TC-ID | Nội dung      | 操作          | 期待結果           | Trace        |
| ----- | ------------- | ----------- | -------------- | ------------ |
| TC-01 | Nhập 1 số     | Nhấn `5`    | Display: `5`   | UC-01 / V-03 |
| TC-02 | Nhập nhiều số | `1 → 2 → 3` | Display: `123` | UC-01        |
| TC-03 | Nhập `00`     | `0 → 0`     | Display: `0`   | V-04         |

### 4.2 Dấu thập phân

| TC-ID | Nội dung           | 操作           | 期待結果           | Trace        |
| ----- | ------------------ | -------------- | ------------------ | ------------ |
| TC-04 | Nhập số thập phân  | `3 → . → 5`    | Display: `3.5`     | UC-03 / V-05 |
| TC-05 | 2 dấu .            | `3 → . → 1 → .`| Không nhận . thứ 2 | V-06         |
| TC-06 | . đầu chuỗi        | `.`            | Display: `0.`      | V-07         |

### 4.3 Toán tử
| TC-ID | Nội dung            | 操作          | 期待結果                | Trace        |
| ----- | ------------------- | ----------- | ------------------- | ------------ |
| TC-07 | Nhập toán tử hợp lệ | `5 → +`     | Display: `5+`       | UC-02        |
| TC-08 | 2 toán tử liên tiếp | `5 → + → +` | `+` thứ 2 bị ignore | BR-02 / V-09 |
| TC-09 | `*` đầu chuỗi       | `*`         | Không xử lý         | BR-04 / V-10 |
| TC-10 | `-` đầu chuỗi       | `- → 5`     | Display: `-5`       | BR-04 / V-11 |

### 4.4 Phần trăm

| TC-ID | Nội dung      | 操作           | 期待結果                | Trace        |
| ----- | ------------- | ------------ | ------------------- | ------------ |
| TC-11 | Tính %        | `50 → %`     | Display: `0.5`      | UC-07 / V-12 |
| TC-12 | `%` liên tiếp | `50 → % → %` | `%` thứ 2 bị ignore | V-13         |
| TC-13 | `%` khi rỗng  | `%`          | Không xử lý         | V-14         |

### 4.5 Thực hiện phép tính

| TC-ID | Nội dung      | 操作             | 期待結果          | Trace |
| ----- | ------------- | -------------- | ------------- | ----- |
| TC-14 | Phép cộng     | `2 + 3 =`      | Display: `5`  | UC-04 |
| TC-15 | Phép trừ      | `5 - 2 =`      | Display: `3`  | UC-04 |
| TC-16 | Phép nhân     | `4 * 3 =`      | Display: `12` | UC-04 |
| TC-17 | Phép chia     | `8 / 2 =`      | Display: `4`  | UC-04 |
| TC-18 | Left-to-right | `10 - 2 * 3 =` | Display: `24` | BR-06 |

### 4.6 Nhấn = bất thường

| TC-ID | Nội dung           | 操作          | 期待結果           | Trace        |
| ----- | ------------------ | ----------- | -------------- | ------------ |
| TC-19 | = khi rỗng         | `=`         | Không xử lý    | V-17         |
| TC-20 | Kết thúc bằng toán tử | `5 + =`   | Không tính    | V-16         |
| TC-21 | Nhấn = nhiều lần   | `2 + 3 = =` | Display vẫn 5 | V-18         |

### 4.7 Chia cho 0
| TC-ID | Nội dung | 操作 | 期待結果 | Trace |
| ----- | -------- | ---- | -------- | ----- |
| TC-22 | /0       | `5 / 0 =` | Hiển thị lỗi | BR-07 / V-19 |
| TC-23 | Ổn định  | /0   | App không crash | V-20 |

### 4.8 Xóa dữ liệu
| TC-ID | Nội dung      | 操作           | 期待結果           | Trace        |
| ----- | ------------- | ------------ | -------------- | ------------ |
| TC-24 | DEL 1 ký tự   | `123 → DEL`  | Display: `12`  | UC-06       |
| TC-25 | DEL khi rỗng  | `DEL`        | Không xử lý    | V-22        |
| TC-26 | AC            | `AC`         | Reset toàn bộ  | UC-05       |

### 4.9 Nhập sai tổng hợp
| TC-ID | Nội dung      | 操作           | 期待結果           | Trace        |
| ----- | ------------- | ------------ | -------------- | ------------ |
| TC-27 | Chuỗi sai     | `5 + * 2`    | Không update   | UC-08       |
| TC-28 | Ký tự lạ     | `@`          | Không nhận    | V-02        |

## 5. 非機能テスト（Basic）

| TC-ID | Nội dung        | Kết quả mong đợi |
| ----- | --------------- | ---------------- |
| TC-29 | Phản hồi        | < 100ms          |
| TC-30 | Không popup lỗi | UI ổn định       |

## 6. Traceability Summary

- Use Case: UC-01 ～ UC-08 → Covered
- Business Rules: BR-01 ～ BR-11 → Covered
- Validation: V-01 ～ V-23 → Covered

## 7. BrSE / QA Checkpoint

- Không test theo “cảm giác”
- Mỗi bug → trace ngược được:
  - TC → Validation → BR → UC → 要件