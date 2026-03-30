FILE HƯỚNG DẪN SỬ DỤNG HỆ THỐNG QUẢN LÝ CHO MƯỢN PHÒNG HỌC

NẾU CHẠY BẰNG HOST VÀ CỔNG KHÁC NGOÀI: http://127.0.0.1:5500/ (go live trong vs) thì vui lòng sửa lại host kết nối trong file server của BE

1. Đối với quản trị viên
tài khoản: admin01, mật khẩu: 12345678
	+ Đăng nhập với tài khoản được cung cấp ở trên
	+ Sau khi đăng nhập, quản trị viên sẽ được điều hướng vào trang quản trị, ở đây hiển thị số lượng tài khoản, số phòng, phòng chờ duyệt
hiện có
	+ Để xem các phòng hiện có hãy ấn vào mục "Quản lý phòng", ở đây sẽ có
		-  Hiển thị các phòng (Tên, trạng thái,...)
		- Có thể sửa thông tin phòng, sửa trạng thái
		- Xóa phòng
	+ Để xem các tài khoản đang có trong hệ thống, ấn vào "Quản lý tài khoản", ở đây có thể thêm/sửa/xóa các tài khoản
	+ Để duyệt/từ chối các yêu cầu duyệt phòng, ấn vào "Duyệt phòng" và chọn phòng cần duyệt/từ chối

2. Đối với người dùng
tài khoản: user02, mật khẩu: 12345678
	+ Đăng nhập với tài khoản được cung cấp ở trên
	+ Sau khi đăng nhập, người dùng sẽ vào trang chủ, ở đây sẽ hiển thị danh sách phòng mà người dùng có thể chọn để đăng ký
, có chức năng tìm kiếm phòng theo tên cho người dùng
	+ Để đăng ký mượn phòng hãy chọn vào phòng cần đăng ký, chọn ngày tháng và chọn ca cần mượn 
	+ Sau khi đăng ký mượn xong, người dùng sẽ được điều hướng về trang "Phòng đã đăng ký", ở đây người dùng có thể theo dõi 
trạng thái mượn phòng, có thể tự hủy yêu cầu, nếu quản trị viên chưa duyệt/từ chối yêu cầu.

--> Chức năng đăng xuất ở góc bên phải màn hình

3. Cài đặt môi trường
 - Do dự án được dựng bằng Nodejs, html, css nên cần phải cài các ứng dụng, package liên quan đến chúng
	+ Cài đặt môi trường Nodejs
	+ Mở terminal để cài đặt các package
 - Các câu lệnh để cài đặt package
	+ npm i --> để cài đặt các package có liên quan đến dự án
	+ npm nodemon --> cài nodemon nếu trong server còn để dự án chạy bằng nodemon
 - Chạy server trên local: npm run dev

 - Hiện tại database được deloy lên supabase, nếu có lỗi truy cập database vui lòng hãy đổi internet hoặc bật VPN
bởi supabase hiện tại bị chặn bởi vài kết nối mạng (VD: mạng Phenikaa). Nếu có thể thì dùng file backup database mẫu (PostgreSQL) của dự án để 
chạy trên local

DATABASE dùng postgres, các bước dưới đây sẽ dùng để import data từ file backup.sql
 + B1: tạo database: createdb -U postgres ten_database
 + B2: import data: psql -U postgres -d ten_database < backup.sql
Nếu khác port
 - psql -U postgres -d ten_database -p 5433 < backup.sql

-> password sẽ là pass khi cài đặt app PostgreSQL


 - Khi chạy trên local cần đổi lại host, tên database và mật khẩu trong file Server/config/database.js
 - Nên mở frontend tại thư mục Client và dùng go live trong visual code để đồng bộ host fe với be 
 - Nếu không dùng Go live thì sau khi chạy server lên có thể truy cập trực tiếp http://127.0.0.1:8081/login.html

