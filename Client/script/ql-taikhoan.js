document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch("http://localhost:8081/api/admin/ql-taikhoan");
        const data = await res.json();
        
        const acc = data.data;

        if (res.ok) {
            const accountsContainer = document.querySelector('.table-container tbody');
            accountsContainer.innerHTML = '';
            acc.forEach(account => {
                const accountElement = document.createElement('tr');
                accountElement.innerHTML = `
                    <td>${account.id}</td>
                    <td>${account.username}</td>
                    <td>${account.email}</td>
                    <td>${account.role}</td>
                    <td>
                        <button class="btn edit" onclick="editAccount(${account.id})">Sửa</button>
                        <button class="btn delete" onclick="deleteAccount(${account.id})">Xóa</button>
                    </td>
                `;
                accountsContainer.appendChild(accountElement); //Đặt tr thành con của tbody
            });
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Lỗi khi tải danh sách tài khoản:", error);
    }

 });


document.getElementById("btnSearch").addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.getElementById("searchInput").value.trim();
    if (username) {
        try {
            const res = await fetch(`http://localhost:8081/api/admin/searching-account?username=${encodeURIComponent(username)}`);
            const data = await res.json();
            
            if (res.ok) {
                const accountsContainer = document.querySelector('.table-container tbody');
                accountsContainer.innerHTML = '';
                data.data.forEach(account => {
                    const accountElement = document.createElement('tr');
                    accountElement.innerHTML = `
                        <td>${account.id}</td>
                        <td>${account.username}</td>
                        <td>${account.email}</td>
                        <td>${account.role}</td>
                        <td>
                            <button class="btn edit" onclick="editAccount(${account.id})">Sửa</button>
                            <button class="btn delete" onclick="deleteAccount(${account.id})">Xóa</button>
                        </td>
                    `;
                    accountsContainer.appendChild(accountElement);
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Lỗi khi tìm kiếm tài khoản:", error);
        }
    } else {
        alert("Vui lòng nhập username để tìm kiếm.");
    }
});


 document.getElementById("btnAddAccount").addEventListener("click", function() {
    window.location.href = "add-account.html"; 
 });

const editAccount = async (id) => {
    if (confirm("Bạn có chắc chắn muốn sửa tài khoản này?")) {
        try {
            const res = await fetch(`http://localhost:8081/api/admin/update-account/${id}`);
            const data = await res.json();

            const acc = data.data;

            if (acc) {
                const tableContainer = document.querySelector('.table-container');
                tableContainer.innerHTML = '';
                const addRooms = document.querySelector('.add-rooms');
                addRooms.innerHTML = '';
                const editAccElement = document.querySelector('.edit-rooms');

                editAccElement.innerHTML = `
                    <div class="edit-rooms">
                        <h2>Sửa tài khoản: ${acc.username}</h2>
                        <form id="editAccountForm">
                            <label for="password">password: </label>
                            <input type="text" id="password" name="password" required value="${acc.password}">

                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required value="${acc.email}">

                            <label for="name">Tên:</label>
                            <input type="text" id="name" name="name" required value="${acc.fullname}">

                            <label for="role">ROLE: </label>
                            <select id="role" name="role" required>
                                <option value="USER" ${acc.role === "USER" ? "selected" : ""}>USER</option>
                                <option value="ADMIN" ${acc.role === "ADMIN" ? "selected" : ""}>ADMIN</option>
                            </select>
                            <button type="submit" class="btn-save" id="btnAddAccount" onclick="saveAccountChanges(${acc.id}, event)">
                                Cập Nhật
                            </button>
                        </form>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Lỗi khi tải thông tin tài khoản:', error);
            alert("Lỗi khi tải thông tin tài khoản. Vui lòng thử lại sau.");
        }
    }
 }

 const deleteAccount = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
        try {
            const res = await fetch(`http://localhost:8081/api/admin/delete-acc/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                window.location.reload(); // Tải lại trang để cập nhật danh sách tài khoản
            } else {
                const data = await res.json();
                alert("Lỗi khi xóa tài khoản: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi khi xóa tài khoản:", error);
        }
    }
 };

 const saveAccountChanges = async (id, event) => {
    event.preventDefault();
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value;

    if(confirm("Bạn có chắc chắn muốn cập nhật tài khoản này?")) {
        try {
            const response = await fetch(`http://localhost:8081/api/admin/update-account/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password, email, name, role })
            });
            if (response.ok) {
                alert("Cập nhật tài khoản thành công!");
                window.location.reload(); 
            } else {
                const data = await response.json();
                throw new Error(data.message || "Cập nhật tài khoản thất bại!");
            }
        } catch (error) {
            alert(error.message);
        }
    }
 };