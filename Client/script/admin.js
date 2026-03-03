
// Demo chuyển trang trong cùng 1 file
const nav = document.getElementById('nav');
const content = document.getElementById('content');

// const pages = {
//     home: `
//         <h1>Home</h1>
//         <p>Trang tổng quan quản trị. Bạn có thể hiển thị số liệu, biểu đồ, thông báo...</p>
//         <div class="grid">
//           <div class="mini"><b>Tổng phòng</b><span>120</span></div>
//           <div class="mini"><b>Chờ duyệt</b><span>8</span></div>
//           <div class="mini"><b>Tài khoản</b><span>32</span></div>
//         </div>
//       `,
//     "add-room": `
//         <h1>Thêm phòng</h1>
//         <p>Đây là nơi bạn đặt form thêm phòng (tên phòng, giá, địa chỉ, ảnh...).</p>
//         <div class="mini" style="margin-top:12px">
//           <b>Gợi ý</b>
//           <span>Thêm form HTML + gọi API backend để lưu dữ liệu.</span>
//         </div>
//       `,
//     accounts: `
//         <h1>Quản lí tài khoản</h1>
//         <p>Danh sách tài khoản, phân quyền, khóa/mở tài khoản...</p>
//         <div class="mini" style="margin-top:12px">
//           <b>Gợi ý</b>
//           <span>Thêm bảng (table) + nút sửa/xóa + phân quyền Admin/Staff.</span>
//         </div>
//       `,
//     approve: `
//         <h1>Duyệt phòng</h1>
//         <p>Hiển thị danh sách phòng chờ duyệt, xem chi tiết và duyệt/từ chối.</p>
//         <div class="mini" style="margin-top:12px">
//           <b>Gợi ý</b>
//           <span>Thêm bộ lọc trạng thái: Chờ duyệt / Đã duyệt / Từ chối.</span>
//         </div>
//       `
// };

// nav.addEventListener('click', (e) => {
//     const a = e.target.closest('a');
//     if (!a) return;
//     e.preventDefault();

//     // active state
//     [...nav.querySelectorAll('a')].forEach(x => x.classList.remove('active'));
//     a.classList.add('active');

//     const key = a.dataset.page;
//     content.innerHTML = pages[key] || `<h1>Không tìm thấy</h1>`;
// });

// Logout demo
document.getElementById('btnLogout').addEventListener('click', () => {
    // Bạn đổi sang endpoint thật của bạn:
    // window.location.href = "/logout";
    alert("Đã bấm Đăng xuất (demo). Bạn đổi sang /logout hoặc gọi API backend nhé.");
});
