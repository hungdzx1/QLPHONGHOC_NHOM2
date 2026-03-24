const cho_duyetBtn = document.getElementById('pending');
const da_duyetBtn = document.getElementById('approved');
const tu_choiBtn = document.getElementById('rejected');

document.addEventListener('DOMContentLoaded', async () => {
    cho_duyetBtn.classList.add('active');
    da_duyetBtn.classList.remove('active');
    tu_choiBtn.classList.remove('active');
    // const 

    try {
        const res = await apiFetch(`${URL_BE}/api/req-rooms-by-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'PENDING' }),
        });

        const results = await res.json();

        // console.log("Results: ", results);

        const rooms = results.data;

        // console.log("Rooms: ", rooms);

        if (rooms && Array.isArray(rooms)) {
            const roomsContainer = document.querySelector('.box-rooms');
            roomsContainer.innerHTML = '';

            rooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.classList.add('rooms');

                const date = new Date(room.date).toLocaleDateString("vi-VN");
                roomElement.innerHTML = `
              <h3>${room.room_name}</h3>
              <p>Người Mượn: ${room.fullname}</p>
              <p>Ca: ${room.ca_hoc}</p>
                <p>Ngày: ${date} </p>
                <p>Lý do: ${room.li_do  ?room.li_do : 'Không có lý do'}</p>
              <p class="status pending">Trạng thái: Chờ duyệt</p>
              <button class="btn-edit" onclick="Duyet(${room.id})">Duyệt</button>
              <button class="btn-delete" onclick="Tu_choi(${room.id})">Từ chối</button>
            `;

                roomsContainer.appendChild(roomElement);
            });
        }

    } catch (error) {
        console.error('Error fetching pending rooms:', error);
    }
});

cho_duyetBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    cho_duyetBtn.classList.add('active');
    da_duyetBtn.classList.remove('active');
    tu_choiBtn.classList.remove('active');

    try {
        const res = await apiFetch(`${URL_BE}/api/req-rooms-by-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'PENDING' }),
        });

        const results = await res.json();

        const rooms = results.data;


        if (rooms && Array.isArray(rooms)) {
            const roomsContainer = document.querySelector('.box-rooms');
            roomsContainer.innerHTML = '';

            rooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.classList.add('rooms');

                const date = new Date(room.date).toLocaleDateString("vi-VN");
                roomElement.innerHTML = `
              <h3>${room.room_name}</h3>
              <p>Người Mượn: ${room.fullname}</p>
              <p>Ca: ${room.ca_hoc}</p>
                <p>Ngày: ${date} </p>
                <p>Lý do: ${room.li_do  ?room.li_do : 'Không có lý do'}</p>
              <p class="status pending">Trạng thái: Chờ duyệt</p>
              <button class="btn-edit" onclick="Duyet(${room.id})">Duyệt</button>
              <button class="btn-delete" onclick="Tu_choi(${room.id})">Từ chối</button>
            `;

                roomsContainer.appendChild(roomElement);
            });
        }

    } catch (error) {
        console.error('Error fetching pending rooms:', error);
    }
});

da_duyetBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    cho_duyetBtn.classList.remove('active');
    da_duyetBtn.classList.add('active');
    tu_choiBtn.classList.remove('active');

    try {
        const res = await apiFetch(`${URL_BE}/api/req-rooms-by-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'APPROVED' }),
        });

        const results = await res.json();


        const rooms = results.data;


        if (rooms && Array.isArray(rooms)) {
            const roomsContainer = document.querySelector('.box-rooms');
            roomsContainer.innerHTML = '';

            rooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.classList.add('rooms');

                const date = new Date(room.date).toLocaleDateString("vi-VN");
                roomElement.innerHTML = `
              <h3>${room.room_name}</h3>
              <p>Sức chứa: ${room.so_luong} người</p>
              <p>Ca: ${room.ca_hoc}</p>
                <p>Ngày: ${date} </p>
                <p>Lý do: ${room.li_do  ?room.li_do : 'Không có lý do'}</p>
              <p class="status ok">Trạng thái: Đã duyệt</p>
            `;

                roomsContainer.appendChild(roomElement);
            });
        }

    } catch (error) {
        console.error('Error --> ', error);
    }
});

tu_choiBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    cho_duyetBtn.classList.remove('active');
    da_duyetBtn.classList.remove('active');
    tu_choiBtn.classList.add('active');


    try {
        const res = await apiFetch(`${URL_BE}/api/req-rooms-by-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'REJECTED' }),
        });

        const results = await res.json();


        const rooms = results.data;


        if (rooms && Array.isArray(rooms)) {
            const roomsContainer = document.querySelector('.box-rooms');
            roomsContainer.innerHTML = '';

            rooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.classList.add('rooms');

                const date = new Date(room.date).toLocaleDateString("vi-VN");
                roomElement.innerHTML = `
              <h3>${room.room_name}</h3>
              <p>Người Mượn: ${room.fullname}</p>
              <p>Ca: ${room.ca_hoc}</p>
                <p>Ngày: ${date} </p>
                <p>Lý do: ${room.li_do  ?room.li_do : 'Không có lý do'}</p>
              <p class="status error">Trạng thái: Đã từ chối</p>
            `;

                roomsContainer.appendChild(roomElement);
            });
        }

    } catch (error) {
        console.error('Error --> ', error);
    }
});

const Duyet = async (id) => {
    if (confirm("Bạn có chắc muốn duyệt yêu cầu này?")) {
        try {
            const res = await apiFetch(`${URL_BE}/api/change-status-bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    status: "APPROVED",
                })
            });

            if(res.ok){
                alert("Yêu cầu đã được duyệt!");
                location.reload();
            }
        } catch (error) {
            console.error('Error --> ', error);
        }
    }
}

const Tu_choi = async (id) => {
    if (confirm("Bạn có chắc muốn từ chối yêu cầu này?")) {
        try {
            const res = await apiFetch(`${URL_BE}/api/change-status-bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    status: "REJECTED",
                })
            });

            if(res.ok){
                alert("Đã từ chối!");
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