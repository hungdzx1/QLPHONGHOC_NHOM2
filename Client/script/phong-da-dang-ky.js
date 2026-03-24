const cho_duyetBtn = document.getElementById('pending');
const da_duyetBtn = document.getElementById('approved');
const tu_choiBtn = document.getElementById('rejected');
const huy_Btn = document.getElementById('cancelled');

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await apiFetch(`${URL_BE}/api/req-rooms`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'PENDING' }),
        });

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
});


cho_duyetBtn.addEventListener('click', async (e) => {
    // e.preventDefault();
    cho_duyetBtn.classList.add('active');
    da_duyetBtn.classList.remove('active');
    tu_choiBtn.classList.remove('active');
    huy_Btn.classList.remove('active');

    try {
        const response = await apiFetch(`${URL_BE}/api/req-rooms`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'PENDING' }),
        });

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
});

da_duyetBtn.addEventListener('click', async (e) => {
    // e.preventDefault();
    cho_duyetBtn.classList.remove('active');
    da_duyetBtn.classList.add('active');
    tu_choiBtn.classList.remove('active');
    huy_Btn.classList.remove('active');

   try {
        const response = await apiFetch(`${URL_BE}/api/req-rooms`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'APPROVED' }),
        });

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
});

tu_choiBtn.addEventListener('click', async (e) => {
    // e.preventDefault();
    cho_duyetBtn.classList.remove('active');
    da_duyetBtn.classList.remove('active');
    tu_choiBtn.classList.add('active');
    huy_Btn.classList.remove('active');

    try {
        const response = await apiFetch(`${URL_BE}/api/req-rooms`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'REJECTED' }),
        });

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
});

huy_Btn.addEventListener('click', async (e) => {
    cho_duyetBtn.classList.remove('active');
    da_duyetBtn.classList.remove('active');
    tu_choiBtn.classList.remove('active');
    huy_Btn.classList.add('active');

    try {
        const response = await apiFetch(`${URL_BE}/api/req-rooms`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'CANCELLED'}),
        });

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