const stt = document.getElementById('status');
const btnChoose = document.getElementById('btn-choose');
const modal = document.getElementById("bookingModal");
const overlay = document.getElementById("overlay");


const ShowStatus = (stt) => {
    stt.className = "status " + stt;
};
 
const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get("roomName");
let room;
console.log(roomName);

document.addEventListener("DOMContentLoaded", async () => {

    // console.log("Tên phòng được chọn:", roomName);
    try {
        const response = await fetch(`http://localhost:8081/api/admin/choose-rooms?roomName=${encodeURIComponent(roomName)}`);
        const data = await response.json();

        // console.log("RESPONSE:", response);
        // console.log("DATA NHẬN ĐƯỢC:", data);
        
       room = data.data[0];

        // console.log("PHÒNG NHẬN ĐƯỢC:", room);

        if (room) {
            const boxRooms = document.querySelector('.box-rooms');
            boxRooms.innerHTML = `
                <div class="rooms">
                    <h3>${room.room_name}</h3>
                    <p>Loại phòng: ${room.room_type}</p>
                    <p>Ca 1 (6h45-9h30)</p>
                    <p>Trạng thái: ${room.is_available ? "Đang sử dụng" : "Bảo trì"} </p>
                    <button class="btn-choose close" onclick="Choose('${room.room_name}')" disabled >Chọn</button>
                </div>

                <div class="rooms">
                    <h3>${room.room_name}</h3>
                    <p>Loại phòng: ${room.room_type}</p>
                    <p>Ca 2 (9h30-12h15)</p>
                    <p>Trạng thái: ${room.is_available ? "Đang sử dụng" : "Bảo trì"} </p>
                    <button class="btn-choose close" onclick="Choose('${room.room_name}')" disabled >Chọn</button>
                </div>

                <div class="rooms">
                    <h3>${room.room_name}</h3>
                    <p>Loại phòng: ${room.room_type}</p>
                    <p>Ca 3 (13h-15h40)</p>
                    <p>Trạng thái: ${room.is_available ? "Đang sử dụng" : "Bảo trì"} </p>
                    <button class="btn-choose close" onclick="Choose('${room.room_name}')" disabled >Chọn</button>
                </div>

                <div class="rooms">
                    <h3>${room.room_name}</h3>
                    <p>Loại phòng: ${room.room_type}</p>
                    <p>Ca 4 (15h45-18h25)</p>
                    <p>Trạng thái: ${room.is_available ? "Đang sử dụng" : "Bảo trì"} </p>
                    <button class="btn-choose close" onclick="Choose('${room.room_name}')" disabled >Chọn</button>
                </div>
            `;
        } else {
            throw new Error(data.message || "Không tìm thấy phòng.");
        }
    } catch (error) {
        console.error('Lỗi: ', error); 
    }

    const chooseEL = document.querySelector(".choose-date");

    if (chooseEL) {
        chooseEL.addEventListener("click", async (event) => {
            let date = document.getElementById("date").value
            event.preventDefault();
             if(!date){
                    alert("Vui lòng chọn ngày để mượn phòng.");
                    return;
                }
            try {
                const res = await fetch(`http://localhost:8081/api/get-status`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        roomName: roomName,
                        date: date,
                    })
                });

               
                
                const row = await res.json();
                const ca1 = Number(row.ca1);
                const ca2 = Number(row.ca2);
                const ca3 = Number(row.ca3);
                const ca4 = Number(row.ca4);
                console.log("Date: ", date);

                const formatted = date.split("-").reverse().join("-");
                console.log(formatted);

                console.log("CA 1:", ca1);
                console.log("CA1 type:", typeof ca1);
                console.log("CA 2:", ca2);
                console.log("CA 3:", ca3);
                console.log("CA 4:", ca4);

                if (res.ok && date) {
                    const boxRooms = document.querySelector('.box-rooms');
                    boxRooms.innerHTML = `
                <div class="rooms">
                    <h3>${room.room_name}</h3>
                    <p>Loại phòng: ${room.room_type}</p>
                    <p>Ca 1 (6h45-9h30)</p>
                    <p class = "status ${ca1 ? 'error' : 'ok'}">Trạng thái: ${ca1 ? "Đã được đặt" : "Còn trống"} </p>
                    <button class="btn-choose close" onclick="Choose('${roomName}', '${formatted}', '${date}', '1')" ${ca1 ? 'disabled' : ''} >Chọn</button>
                </div>

                <div class="rooms">
                    <h3>${room.room_name}</h3>
                    <p>Loại phòng: ${room.room_type}</p>
                    <p>Ca 2 (9h30-12h15)</p>
                    <p class = "status ${ca2 ? 'error' : 'ok'}">Trạng thái: ${ca2 ? "Đã được đặt" : "Còn trống"} </p>
                    <button class="btn-choose close" onclick="Choose('${roomName}', '${formatted}', '${date}', '2')" ${ca2 ? 'disabled' : ''} >Chọn</button>
                </div>

                <div class="rooms">
                    <h3>${room.room_name}</h3>
                    <p>Loại phòng: ${room.room_type}</p>
                    <p>Ca 3 (13h-15h40)</p>
                    <p class = "status ${ca3 ? 'error' : 'ok'}">Trạng thái: ${ca3 ? "Đã được đặt" : "Còn trống"} </p>
                    <button class="btn-choose close" onclick="Choose('${roomName}', '${formatted}', '${date}', '3')" ${ca3 ? 'disabled' : ''} >Chọn</button>
                </div>

                <div class="rooms">
                    <h3>${room.room_name}</h3>
                    <p>Loại phòng: ${room.room_type}</p>
                    <p>Ca 4 (15h45-18h25)</p>
                    <p class = "status ${ca4 ? 'error' : 'ok'}">Trạng thái: ${ca4 ? "Đã được đặt" : "Còn trống"} </p>
                    <button class="btn-choose close" onclick="Choose('${roomName}', '${formatted}', '${date}', '4')" ${ca4 ? 'disabled' : ''} >Chọn</button>
                </div>
            `;
                } else {
                    throw new Error(data.message || "Không tìm thấy phòng.");
                }
            } catch (error) {
                console.error('Lỗi khi lấy trạng thái phòng:', error);
            }
        });
    }

});


overlay.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
});


//Tại sao const Choose lại không chạy khi ấn vào button "Chọn" trong phần hiển thị phòng sau khi chọn ngày? Mặc dù đã console.log để kiểm tra nhưng không thấy gì cả?
const Choose = (roomName, formatted, date, ca_hoc) => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    modal.innerHTML = `
        <div class="modal-content">
        <h2>Xác nhận đặt phòng</h2>
        <p>Tên Phòng: ${roomName}</p>
        <p>Loại phòng: Phòng học</p>
        <p>Ca: 2 (9h30-12h15)</p>
        <p>Ngày mượn: ${formatted}</p>
        <div class="input-inf">
          <label>Mục đích mượn phòng:</label>
          <input type="text" id="purpose" placeholder="Mục đích mượn phòng?">
        </div>
        <div class="modal-buttons">
          <button id="confirmBtn" class="confirmBtn">Xác nhận</button>
          <button id="closeModal" class="closeModal">Hủy</button>
        </div>
      </div>
    `;
    const btnCloseModal = document.getElementById('closeModal');
    const btnConfirm = document.getElementById('confirmBtn');

    btnCloseModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    });

    btnConfirm.addEventListener("click", async () => {
        const purpose = document.getElementById("purpose").value.trim();
        try {
            const res = await fetch('http://localhost:8081/api/bookings', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomName: roomName,
                    date: date,
                    ca_hoc: ca_hoc,
                    purpose: purpose,
                })
            });
            const data = await res.json();
            if (res.ok) {
                alert("Đặt phòng thành công!");
                modal.classList.add("hidden");
                overlay.classList.add("hidden");
            } else {
                alert("Đặt phòng thất bại: " + data.message);
            }
        } catch (error) {
            
        }
    });
};

