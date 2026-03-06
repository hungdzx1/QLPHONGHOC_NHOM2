document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:8081/api/admin/rooms");
        const results = await response.json();

        const rooms = results.data;

        if (rooms && Array.isArray(rooms)) {
            const roomsContainer = document.querySelector('.box-rooms');
            roomsContainer.innerHTML = '';

            rooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.classList.add('rooms');

                roomElement.innerHTML = `
              <h3>${room.room_name}</h3>
              <p>Loại phòng: ${room.room_type}</p>
              <p>Sức chứa: ${room.so_luong} người</p>
              <p class="status ${room.is_available ? 'ok' : 'error'}">Trạng thái: ${room.is_available ? "Đang sử dụng" : "Bảo trì"} </p>
              <button class="btn-choose" onclick="Choose('${room.room_name}')">Chọn</button>
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
                    const res = await fetch(`http://localhost:8081/api/admin/searching?name=${encodeURIComponent(name)}`);


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
                            <h3>${room.room_name}</h3>
                            <p>Loại phòng: ${room.room_type}</p>
                            <p>Sức chứa: ${room.so_luong} người</p>
                            <p class="status ${room.is_available ? 'ok' : 'error'}">Trạng thái: ${room.is_available ? "Đang sử dụng" : "Bảo trì"} </p>
                            <button class="btn-choose" onclick="Choose(${room.room_name})">Chọn</button>
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

const Choose = (room_name) => {
    window.location.href = `choose-rooms.html?roomName=${encodeURIComponent(room_name)}`;
}







