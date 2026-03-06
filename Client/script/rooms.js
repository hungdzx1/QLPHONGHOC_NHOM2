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
              <button class="btn-edit" onclick="editRoom(${room.id})">Sửa</button>
              <button class="btn-delete" onclick="deleteRoom(${room.id})">Xóa</button>
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

                    // console.log(res);

                    // console.log(name);

                    // console.log(encodeURIComponent(name));

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
                      <button class="btn-edit" onclick="editRoom(${room.id})">Sửa</button>
                      <button class="btn-delete" onclick="deleteRoom(${room.id})">Xóa</button>
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

const editRoom = async (id) => {
    // event.preventDefault();
    // window.location.href = `build.html?id=${id}`;
    if(confirm("Bạn có chắc chắn muốn sửa phòng này?")) {
        try {
            const response = await fetch(`http://localhost:8081/api/update-rooms/${id}`);
            const data = await response.json();
            const room = data.data;
            if (room) {
                const roomsContainer = document.querySelector('.box-rooms');
                roomsContainer.innerHTML = '';
                const roomsAdd = document.querySelector('.add-rooms');
                roomsAdd.innerHTML = '';
                const editRoomContainer = document.querySelector('.edit-rooms');
                editRoomContainer.innerHTML = `
                <h3>Sửa thông tin phòng ${room.room_name}</h3>
                <form id="editRoomForm">
                    <label for="roomName">Tên phòng:</label>
                    <input type="text" id="roomName" name="roomName" value="${room.room_name}" required>

                    <label for="roomType">Loại phòng:</label>
                    <select id="roomType" name="roomType" required>
                        <option value="Phòng Học" ${room.room_type === "Phòng Học" ? "selected" : ""}>Phòng học</option>
                        <option value="Phòng Máy" ${room.room_type === "Phòng Máy" ? "selected" : ""}>Phòng máy</option>
                        <option value="Phòng Thí Nghiệm" ${room.room_type === "Phòng Thí Nghiệm" ? "selected" : ""}>Phòng thí nghiệm</option>
                    </select>

                    <label for="capacity">Sức chứa:</label>
                    <input type="number" id="capacity" name="capacity" value="${room.so_luong}" min="1" required>

                    <label for="status">Trạng thái:</label>
                    <select id="status" name="status" required>
                        <option value="1" ${room.is_available ? "selected" : ""}>Đang sử dụng</option>
                        <option value="0" ${!room.is_available ? "selected" : ""}>Bảo trì</option>
                    </select>

                    <button type="submit" class="btn-save" onclick="saveRoomChanges(${room.id}, event)">Lưu thay đổi</button>
                </form>`;
            }
        } catch (error) {
            console.error('Lỗi khi tải thông tin phòng:', error);
            alert("Lỗi khi tải thông tin phòng. Vui lòng thử lại sau.");
        }
    }

}

const deleteRoom = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
        try {
            const response = await fetch(`http://localhost:8081/api/admin/delete-room/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Xóa phòng thành công!");
                window.location.reload(); // Tải lại trang để cập nhật danh sách phòng
            } else {
                alert("Xóa phòng thất bại!");
            }
        } catch (error) {
            console.error('Lỗi khi xóa phòng:', error);
            alert("Lỗi khi xóa phòng. Vui lòng thử lại sau.");
        }
    }
};

async function saveRoomChanges(id, event) {
    event.preventDefault();
    const roomName = document.getElementById("roomName").value;
    const roomType = document.getElementById("roomType").value;
    const capacity = document.getElementById("capacity").value;
    const status = document.getElementById("status").value;

    if (confirm("Bạn có chắc chắn muốn lưu thay đổi?")) {
        try {
            const res = await fetch(`http://localhost:8081/api/results-update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomName: roomName,
                    roomType: roomType,
                    capacity: capacity,
                    status: status
                })
            });

            const data = await res.json(); // 

            if (!res.ok) {

                throw new Error(data.message); // Nếu API trả về lỗi, ném lỗi để hiển thị thông báo
            }

            alert("Cập nhật phòng thành công!");
            window.location.reload();

        } catch (error) {
            alert(error.message);
        }
    }

    console.log(id, roomName, roomType, capacity, status);
}

document.getElementById("btnAddRoom").addEventListener("click", function () {
    window.location.href = "add-rooms.html";
});