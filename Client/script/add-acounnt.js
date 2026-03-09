document.getElementById('btnAddAccount').addEventListener('click', async function(event) {
  event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const fullname = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    

    if(confirm("Bạn có chắc chắn muốn tạo tài khoản mới?")) {
        try {
            const res = await apiFetch(`${URL_BE}/api/admin/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    fullname: fullname,
                    role: role
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Tạo tài khoản thành công!");
                window.location.href = "/ql-taikhoan.html";
            } else {
                throw new Error(data.message || "Tạo tài khoản thất bại!");
            }

        } catch (error) {
            alert(error.message);
        }
    }

});

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