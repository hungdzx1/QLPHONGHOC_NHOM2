document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch("http://localhost:8081/api/get-total-rows");
        const data = await res.json();
        
        if (res.ok) {
            const totalRows = document.querySelector(".grid");
            totalRows.innerHTML = `
                <div class="mini">
                    <b>Tổng phòng</b>
                    <span>${data.totalRooms || 0}</span>
                </div>
                <div class="mini">
                    <b>Chờ duyệt</b>
                    <span>${data.pendingRooms || 0}</span>
                </div>
                <div class="mini">
                    <b>Tài khoản</b>
                    <span>${data.totalAccounts || 0}</span>
                </div>
            `;
        } else {
            throw new Error(data.message || "Lỗi khi tải dữ liệu tổng quan");
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu tổng quan:", error.message);
    }
});

// Logout demo
document.getElementById('btnLogout').addEventListener('click', () => {
    // Bạn đổi sang endpoint thật của bạn:
    // window.location.href = "/logout";
    alert("Đã bấm Đăng xuất (demo). Bạn đổi sang /logout hoặc gọi API backend nhé.");
});
