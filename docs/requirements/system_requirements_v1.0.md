# 要件定義書（System Requirements）

Calculator Application
```
Version : 1.0  
Status  : Draft → To be Frozen  
Scope   : Frontend only (HTML / CSS / JavaScript)
```

## 1. 本書の目的（Mục đích tài liệu）

- Xác định yêu cầu hệ thống ở mức logic cho ứng dụng Calculator.
- Làm cơ sở thống nhất nhận thức giữa:

  - Khách hàng
  - BrSE / PM
  - Dev / QA
- Là baseline để:

  - Thiết kế UI : Layout, Buttons, Display, v.v.
  - Thiết kế xử lý logic : Calculator Logic, Input Validation, Button Actions, v.v.
  - Lập Test Case : Functional / Non-Functional

## 2. システム概要（Tổng quan hệ thống）

| 項目     | 内容                     |
| ------ | ---------------------- |
| システム名  | Calculator Application |
| 種別     | Standalone Application |
| 利用形態   | Web / Browser          |
| バックエンド | Không sử dụng          |
| データ保存  | Không lưu persistent   |

## 3. 利用者定義（User Definition）
| ユーザー種別   | 説明                       |
| -------- | ------------------------ |
| End User | Người sử dụng calculator |

※ Không phân quyền, không login.

## 4. 機能要件（Functional Requirements）
### 4.1 入力機能（Input）

#### FR-01

- Hệ thống cho phép người dùng nhập các ký tự sau:

  - Số: 0～9, 00
  - Ký hiệu: .
  - Toán tử: +, -, *, /, %
### 4.2 表示機能（Display）

#### FR-02

- Hệ thống hiển thị:

  - Chuỗi phép tính đang nhập
  - Kết quả sau khi thực hiện phép tính

#### FR-03

- Màn hình hiển thị chỉ có 1 vùng display ở phía trên.

### 4.3 演算処理（Calculation Logic）

#### FR-04

- Hệ thống thực hiện phép tính theo thứ tự nhập (left-to-right).

#### FR-05
- Khi nhấn =:

  - Hệ thống hiển thị kết quả cuối cùng.

#### FR-06

- Khi nhấn = nhiều lần:

  - Kết quả không thay đổi nếu không có phép toán mới.

### 4.4 操作ボタン（Button Actions）
| ボタン | 要件                                  |
| --- | ----------------------------------- |
| AC  | Xóa toàn bộ dữ liệu nhập và kết quả |
| DEL | Xóa 1 ký tự cuối cùng               |
| %   | Thực hiện phép tính phần trăm       |
| =   | Thực hiện phép tính                 |

### 4.5 入力制御（Input Validation）

#### FR-07

- Không cho phép nhập:
  - 2 toán tử liên tiếp (++, --, **)
  - 2 dấu chấm trong cùng 1 số (1..2)

#### FR-08

- Nếu nhập sai logic:
  - Hệ thống không crash
  - Không hiển thị kết quả sai
  
## 5. 非機能要件（Non-Functional Requirements）
### 5.1 操作性（Usability）

- Giao diện:
  - Nút bấm lớn
  - Khoảng cách rõ ràng

- Có thể sử dụng bằng:
  - Chuột
  - Touch

### 5.2 性能（Performance）

- Thời gian phản hồi:
  - ≤ 100ms cho mỗi thao tác

### 5.3 信頼性（Reliability）

- Ứng dụng không bị treo khi:

  - Nhập sai logic
  - Chia cho 0

### 5.4 互換性（Compatibility）

- Hoạt động trên:
  - Chrome (latest)
  - Edge (latest)
  - Mobile browser phổ biến

## 6. データ要件（Data Requirements）

- Không sử dụng database
- Không lưu lịch sử tính toán
- Dữ liệu chỉ tồn tại trong runtime session

## 7. 制約条件（Constraints）

- Không sử dụng backend
- Không kết nối mạng
- Không yêu cầu tài khoản
- Không sử dụng thư viện tính toán phức tạp

## 8. エラー・例外処理（Error & Exception）
| ケース                     | 振る舞い                                |
| ----------------------- | ----------------------------------- |
| Chia cho 0              | Hiển thị thông báo lỗi              |
| Chuỗi nhập không hợp lệ | Không tính, giữ trạng thái hiện tại |
| Input rỗng + `=`        | Không xử lý                         |

## 9. スコープ外（Out of Scope）

- Scientific calculator
- Lưu lịch sử
- Export kết quả
- Custom theme
- Multi-language

## 10. 成果物（Deliverables）

- UI Calculator (1 screen)
- Logic xử lý phép tính

## 11. 改訂履歴（Revision History）
| Version | Date       | Description          | Author   |
| ------- | ---------- | -------------------- | -------- |
| 1.0     | 2026-01-25 | 初版作成             | BrSE     |