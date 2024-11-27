# A SMART PRINTING SERVICE FOR STUDENTS AT HCMUT

## I. Thông tin dự án
Ứng dụng này được hiện thực để phục vụ cho môn học Công nghệ phần mềm, thuộc về Trường Đại học Bách khoa, ĐHQG TP.HCM. Dự án hướng đến mục tiêu xây dựng nên một trang web cung cấp dịch vụ in ấn tiện lợi cho sinh viên của trường.

---

## II. Ngôn ngữ và công nghệ sử dụng
- **React**: Thư viện JavaScript để xây dựng giao diện người dùng hiện đại, dễ quản lý và mở rộng.
- **Vite**: Công cụ build hiện đại, nhẹ, và tốc độ cao cho các dự án Frontend.
- **Tailwind CSS**: Framework CSS theo phương pháp tiện ích-first, giúp tăng tốc độ phát triển giao diện.

---

## III. Tính năng

### 1. **Sinh viên**
- **Đăng nhập**: Sinh viên cần đăng nhập qua HCMUT_SSO để xác thực trước khi sử dụng hệ thống.
- **Tải tệp tài liệu**: Chỉ được tải lên các tệp phù hợp, đảm bảo kích thước file nằm trong giới hạn cho phép.
- **Cấu hình in ấn**: Sinh viên chọn máy in, định dạng bản in (khổ giấy, in 1 hay 2 mặt, số lượng bản sao, số trang).
- **Kiểm soát số trang in**: Hệ thống chỉ cho phép in số trang nằm trong giới hạn còn lại của tài khoản. Nếu không đủ, sẽ yêu cầu nạp thêm tiền.
- **Xem trạng thái tài khoản**: Hiển thị số lượng trang A4 còn lại trong tài khoản.
- **Thanh toán**: Cung cấp tính năng mua thêm số trang in qua các hệ thống thanh toán trực tuyến như BKPay.
- **Lịch sử in**: Sinh viên có thể xem lịch sử in của mình trong một khoảng thời gian, kèm theo bản tóm tắt số trang đã in theo từng khổ giấy.
- **Đánh giá dịch vụ**: Cho phép sinh viên đánh giá chất lượng dịch vụ in.
- **Thông báo**: Gửi thông báo khi hoàn thành in tài liệu hoặc khi hệ thống ngừng hoạt động.

### 2. **SPSO (Quản Lý Dịch Vụ In)**
- **Đăng nhập**: Sử dụng HCMUT_SSO để xác thực trước khi sử dụng hệ thống.
- **Quản lý tệp tài liệu**: Quy định loại và kích thước tệp được phép tải lên để in (thêm, xóa, chỉnh sửa).
- **Lịch sử in**: Xem lịch sử in của tất cả sinh viên trong một khoảng thời gian, bao gồm các thông tin:
  - Mã số sinh viên.
  - ID máy in.
  - Tên tệp tin.
  - Thời gian bắt đầu và kết thúc in.
  - Số trang cho từng khổ giấy.
  - Ca trực của nhân viên.
- **Báo cáo sử dụng**: Tạo và xem báo cáo sử dụng hệ thống in theo tháng, năm, với các tùy chọn:
  - Theo từng sinh viên, nhóm sinh viên, hoặc toàn bộ sinh viên.
  - Theo một hoặc nhiều máy in.
- **Điều chỉnh số trang mặc định**: Thay đổi số lượng trang in mặc định mỗi học kỳ, đặc biệt vào đầu học kỳ.
- **Quản lý máy in**: Theo dõi tình trạng máy in để thêm mới, bật hoặc tắt khi cần.

### 3. **Nhân viên phòng in**
- **Đăng nhập**: Xác thực qua HCMUT_SSO trước khi sử dụng hệ thống.
- **Xử lý yêu cầu in**: Nhận thông tin và thực hiện in tài liệu theo yêu cầu của sinh viên.
- **Báo cáo tình trạng máy in**: Cập nhật tình trạng hoạt động của máy in, đề xuất thêm mới, bật hoặc tắt máy.
- **Xác nhận tình trạng in**: Ghi nhận trạng thái hoàn thành của tài liệu (đã in xong hoặc gặp lỗi). Đối với lỗi, cung cấp thời gian dự kiến để in lại.
- **Thông báo hết hạn**: Thông báo cho sinh viên nếu sắp hết hạn lấy tài liệu. Sau thời gian quy định, tài liệu chưa lấy sẽ bị hủy.
- **Lịch làm việc**: Đăng ký ca làm việc, xem lịch trực và xin nghỉ khi có việc đột xuất.

---

## IV. Công nghệ
- **Ngôn ngữ**: HTML, CSS, JavaScript.
- **Framework**: ReactJS.
- **Styling**: Tailwind CSS.
- **API Interaction**: Axios, Fetch API.

---

## V. Công cụ yêu cầu
Những yêu cầu trước khi cài đặt và chạy dự án:
- **Node.js** 
- **npm** 
- Trình duyệt hỗ trợ JavaScript hiện đại.
- **Visual Studio Code (VS Code)**: Trình soạn thảo mã nguồn.
- **Git**: Cần thiết nếu bạn sẽ clone dự án từ GitHub.  

## VI. Installation  
### Hướng dẫn chi tiết để cài đặt dự án:  

#### Bước 1: Clone dự án từ GitHub  
Sử dụng lệnh sau để clone dự án về máy:  
```bash
git clone https://github.com/shinsodev/FE-SSPS.git
```
### Bước 2: Cài đặt các thư viện cần thiết
Di chuyển vào thư mục dự án và cài đặt các thư viện bằng lệnh:
```
npm install
```
### Bước 3: Khởi động ứng dụng
1. Sau khi cài đặt hoàn tất, chạy ứng dụng bằng lệnh
```bash
   npm run dev
```
2. Hệ thống sẽ hiển thị địa chỉ của ứng dụng:
```
➜  Local:   http://localhost:5173/
```
3. Mở trình duyệt và truy cập địa chỉ trên để xem ứng dụng.

## VII. Cấu trúc thư mục Frontend  

```plaintext
├── admin/          # Chứa các tệp về code liên quan đến quản lý dịch vụ in của spso và nhân viên
├── assets/         # Thư mục chứa tài nguyên tĩnh (hình ảnh, font, v.v.)
├── components/     # Chứa các thành phần (components) dùng trong ứng dụng
├── context/        # Quản lý trạng thái toàn cục của ứng dụng (Context API)
├── pages/          # Các trang chính của ứng dụng
├── public/         # Thư mục chứa các tệp tĩnh công khai
├── services/       # Chứa các tệp tương tác với API (service layer)
├── App.css         # Tệp CSS cho ứng dụng chính
├── App.jsx         # Tệp chính của ứng dụng React
├── datepicker.css  # Tệp CSS liên quan đến DatePicker (nếu có sử dụng)
├── index.css       # Tệp CSS chung cho toàn bộ ứng dụng
├── main.jsx        # Điểm vào chính của ứng dụng React
```

## VIII. Thành viên nhóm  

| STT | MSSV    | Tên Thành Viên           | Role       |
|-----|---------|--------------------------|------------|
| 1   | 2213836 | Lê Thanh Tuyển           | Dev FE     |
| 2   | 2213132 | Nguyễn Công Thành        | Dev BE     |
| 3   | 2212880 | Đặng Thị Quỳnh           | Dev FE     |
| 4   | 2212631 | Nguyễn Ngọc Châu Phúc    | Dev FE     |
| 5   | 2210805 | Nguyễn Việt Đức          | Dev FE     |
| 6   | 2210768 | Nguyễn Văn Đoàn          | Dev FE     |
| 7   | 2213609 | Phan Duệ Triết           | Dev BE     |
| 8   | 2212307 | Nguyễn Lâm Nguyên        | Dev BE     |
| 9   | 2211721 | Lê Hữu Kiên              | Dev BE     |
| 10  | 2210871 | Quách Khải Hào           | Dev BE     |
