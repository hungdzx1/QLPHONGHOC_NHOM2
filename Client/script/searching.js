document.addEventListener("DOMContentLoaded", async function () {
    const btnSearch = document.getElementById("btnSearch");
    const name = document.getElementById("searchInput").value.trim();

    const res = await fetch("http://localhost:8081/api/login", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name })
                    });
});


    if (btnSearch) {
        btnSearch.addEventListener("click", () => {
            // window.location.href = "/searching.html";

            try {
                
                if (name) {
                    

                    const data = await res.json().catch(() => ({}));

                    const room = data.data;

                    if (!res.ok) {
                        alert("Tìm kiếm thất bại: " + (data.message || "Lỗi server"));
                        return;
                    }

                    if (room) {
                        // Hiển thị kết quả tìm kiếm
                        const roomsContainer = document.querySelector('.box-rooms');
                        roomsContainer.innerHTML = '';
                        const roomElement = document.createElement('div');
                        roomElement.classList.add('rooms');

                        roomElement.innerHTML = `
                      <h3>${room.roomName}</h3>
                      <p>Loại phòng: phòng học </p>
                      <p>Sức chứa: 40 người người</p>
                      <p>Trạng thái: ${room.isAvailable ? "Đang sử dụng" : "Bảo trì"} </p>
                      <button class="btn-edit" onclick="editRoom(${room.idRooms})">Sửa</button>
                      <button class="btn-delete" onclick="deleteRoom(${room.idRooms})">Xóa</button>
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
                alert("Lỗi khi tìm kiếm phòng. Vui lòng thử lại sau.");
            }
        });
    }