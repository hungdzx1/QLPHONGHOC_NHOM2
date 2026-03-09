document.getElementById("btnAddRoom").addEventListener("click", async function (event) {
    event.preventDefault();
    let roomName = document.getElementById("roomName").value;
    let roomType = document.getElementById("roomType").value;
    let capacity = document.getElementById("capacity").value;
    let status = document.getElementById("status").value;

    if (confirm("Bạn có chắc chắn muốn tạo phòng mới?")) {
        
        try {
            const res = await apiFetch(`${URL_BE}/api/create-new-rooms`, {
                method: "POST",
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

            const data = await res.json();

                if(!res.ok) {
                    throw new Error(data.message);
        }

            alert("Tạo phòng thành công!");
            window.location.href = "rooms.html"
        } catch (error) {
            console.error('Lỗi khi tạo phòng:', error);
            alert("Lỗi khi tạo phòng: " + error.message);
        }


    }
});

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