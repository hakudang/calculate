# ユースケース定義書（Use Case Specification）

Calculator Application

```
Version : 1.0  
Status  : Draft → To be Frozen  
Scope   : Frontend Web App
```

## 1. ユースケース一覧（Use Case List）

| UC-ID | ユースケース名    | 概要                           |
| ----- | ---------- | ---------------------------- |
| UC-01 | 数値を入力する    | Người dùng nhập số           |
| UC-02 | 演算子を入力する   | Người dùng nhập toán tử      |
| UC-03 | 小数点を入力する   | Người dùng nhập số thập phân |
| UC-04 | 計算を実行する    | Thực hiện phép tính          |
| UC-05 | 全入力をクリアする  | Xóa toàn bộ                  |
| UC-06 | 1文字削除する    | Xóa 1 ký tự                  |
| UC-07 | パーセント計算を行う | Tính phần trăm               |
| UC-08 | エラー入力を制御する | Xử lý nhập sai               |

## 2. UC-01 数値を入力する（Input Number）
### 目的

Người dùng nhập số để thực hiện phép tính.

### 主アクター

End User

### 関連画面

CAL-01: Calculator Main Screen

### 事前条件
Ứng dụng đang hiển thị màn hình calculator.

### 事後条件

Số được thêm vào chuỗi hiển thị.

### 基本フロー

1. Người dùng nhấn nút số (`0～9` hoặc `00`)
2. Hệ thống thêm số vào cuối chuỗi hiện tại
3. Chuỗi được hiển thị trên màn hình

## 3. UC-02 演算子を入力する（Input Operator）
### 目的

Người dùng nhập toán tử cho phép tính.

### 主アクター
End User

### 事前条件

Đã có ít nhất 1 số trên màn hình

### 事後条件

Toán tử được thêm vào chuỗi nhập

### 基本フロー

1. Người dùng nhấn `+`/ `-`/ `*`/ `/`
2. Hệ thống kiểm tra ký tự cuối 
3. Nếu hợp lệ → thêm toán tử vào chuỗi

### 代替フロー

- AF-01: Nếu ký tự cuối là toán tử → không xử lý

## 4. UC-03 小数点を入力する（Input Decimal）
### 目的

Cho phép nhập số thập phân.

### 主アクター
- End User

### 基本フロー

1. Người dùng nhấn `.`
2. Hệ thống kiểm tra số hiện tại
3. Nếu chưa có `.` → thêm vào chuỗi

### 代替フロー

- AF-01: Nếu số hiện tại đã có . → không xử lý

## 5. UC-04 計算を実行する（Execute Calculation）
### 目的

Thực hiện phép tính và hiển thị kết quả.

### 主アクター
- End User

### 事前条件

- Chuỗi nhập hợp lệ

### 事後条件
Kết quả được hiển thị

### 基本フロー

1. Người dùng nhấn `=`
2. Hệ thống phân tích chuỗi nhập
3. Thực hiện phép tính theo thứ tự nhập
4. Hiển thị kết quả

### 代替フロー

- AF-01: Chuỗi không hợp lệ → không tính

## 6. UC-05 全入力をクリアする（All Clear）
### 目的

Xóa toàn bộ dữ liệu nhập.

### 主アクター
- End User

### 基本フロー

1. Người dùng nhấn `AC`
2. Hệ thống xóa chuỗi nhập
3. Màn hình trở về trạng thái ban đầu

## 7. UC-06 1文字削除する（Delete Last Character）
### 目的

Xóa ký tự cuối cùng.

### 主アクター

- End User

### 基本フロー

1. Người dùng nhấn `DEL`
2. Hệ thống xóa 1 ký tự cuối
3. Cập nhật hiển thị

## 8. UC-07 パーセント計算を行う（Percentage Calculation）
### 目的

Thực hiện phép tính phần trăm.

### 主アクター

- End User

### 基本フロー

1. Người dùng nhấn %
2. Hệ thống chuyển số hiện tại sang dạng phần trăm
3. Cập nhật chuỗi hiển thị

## 9. UC-08 エラー入力を制御する（Invalid Input Handling）
### 目的

Ngăn chặn nhập sai và đảm bảo hệ thống ổn định.

### 主アクター

- End User
### 基本フロー

1. Người dùng nhập chuỗi sai (ví dụ ++, ..)
2. Hệ thống phát hiện sai logic
3. Không cập nhật chuỗi
4. Không crash hệ thống

## 10. 共通ルール（Common Rules）

- Mỗi lần nhấn nút → 1 hành động duy nhất
- Không cho phép:
  - 2 toán tử liên tiếp
  - 2 dấu `.` trong cùng 1 số
- Chia cho 0 → hiển thị lỗi

## 11. 改訂履歴（Revision History）
| Version | Date       | Description          | Author   |
| ------- | ---------- | -------------------- | -------- |
| 1.0     | 2026-01-25 | 初版作成             | BrSE     |