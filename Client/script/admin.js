document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await apiFetch(`${URL_BE}/api/get-total-rows`);
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
                    <span>${data.totalBookings || 0}</span>
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
document.getElementById('btnLogout').addEventListener('click', async () => {
    if (confirm("Bạn có muốn đăng xuất tài khoản này?")) {
        try {
            const res = await apiFetch(`${URL_BE}/api/logout`, {
                method: "POST",
                credentials: "include"
            });

            const data = await res.json();

            alert(data.message);

            window.location.href = "login.html";

        } catch (error) {
            console.error("Lỗi khi đăng xuất: ", error);
        }
    }
});
