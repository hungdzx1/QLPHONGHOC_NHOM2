document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await apiFetch(`${URL_BE}/api/req-rooms`);
        const results = await response.json();

        const rooms = results.data;

        if (rooms && Array.isArray(rooms)) {
            const roomsContainer = document.querySelector('.box-rooms');
            roomsContainer.innerHTML = '';

            rooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.classList.add('rooms');
                const date = new Date(room.date).toLocaleDateString("vi-VN");
                roomElement.innerHTML = `
                <h3>Phòng ${room.room_name}</h3>
                <p>Loại phòng: ${room.room_type}</p>
                <p>Ca: ${room.ca_hoc}</p>
                <p>Ngày: ${date} </p>
                <p class="status ${room.status === 'CANCELLED' ? 'cancelled' : room.status === 'PENDING' ? 'pending' : room.status === 'APPROVED' ? 'ok' : 'error'}" id="status">
                    Trạng thái: 
                    ${room.status === "PENDING" ? "Chờ Duyệt" : room.status === "APPROVED" ? "Đã Duyệt" : room.status === "REJECTED" ? "Bị từ chối" : "Đã hủy"}
                </p>
                <button class="btn-xoa" id="btn-xoa" ${(room.status === "APPROVED" || room.status === "CANCELLED" || room.status === "REJECTED") ? "disabled" : ""} onclick="Huy_phong(${room.id})">
                    Hủy
                </button>
            `;

                roomsContainer.appendChild(roomElement);
            });
        } else {
            console.error('Không có dữ liệu phòng hoặc dữ liệu không hợp lệ');
        }
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu phòng:', error);
    }

    const btnSearch = document.getElementById("btnSearch");

    if (btnSearch) {
        btnSearch.addEventListener("click", async (event) => {
            event.preventDefault();
            const name = document.getElementById("searchInput").value.trim();
            try {
                if (name) {
                    const res = await apiFetch(`${URL_BE}/api/admin/searching?name=${encodeURIComponent(name)}`);


                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(data.message);
                    }

                    // console.log("DATA NHẬN ĐƯỢC:", data); 

                    const room = data.data[0];

                    // console.log(room);

                    if (room) {
                        const roomsContainer = document.querySelector('.box-rooms');
                        roomsContainer.innerHTML = '';
                        const roomElement = document.createElement('div');
                        roomElement.classList.add('rooms');

                        roomElement.innerHTML = `
                            <h3>Phòng ${room.room_name}</h3>
                            <p>Loại phòng: ${room.room_type}</p>
                            <p>Ca: ${room.ca_hoc}</p>
                            <p>Ngày: ${date} </p>
                            <p class="status ${room.status === 'CANCELLED' ? 'cancelled' : room.status === 'PENDING' ? 'pending' : room.status === 'APPROVED' ? 'ok' : 'error'}" id="status">
                                Trạng thái: 
                                ${room.status === "PENDING" ? "Chờ Duyệt" : room.status === "APPROVED" ? "Đã Duyệt" : room.status === "REJECTED" ? "Bị từ chối" : "Đã hủy"}
                            </p>
                            <button class="btn-xoa" id="btn-xoa" ${(room.status === "APPROVED" || room.status === "CANCELLED" || room.status === "REJECTED") ? "disabled" : ""} onclick="Huy_phong(${room.id})">
                            Hủy
                            </button>
                    `;

                        roomsContainer.appendChild(roomElement);
                    }
                    else {
                        alert("Không tìm thấy phòng phù hợp.");
                    }

                } else {
                    alert("Vui lòng nhập từ khóa tìm kiếm.");
                }
            } catch (error) {
                console.error('Lỗi khi tìm kiếm phòng:', error);
                alert(error.message);
            }
        });
    }

});

const Huy_phong = async (id) => {
    if (confirm("Bạn có chắc muốn hủy yêu cầu này?")) {
        try {
            const res = await apiFetch(`${URL_BE}/api/change-status-bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    status: "CANCELLED",
                })
            });

            if (res.ok) {
                alert("Yêu cầu đã được hủy!");
                location.reload();
            }
        } catch (error) {
            console.error('Error --> ', error);
        }
    }
}


/*LOGOUT*/
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