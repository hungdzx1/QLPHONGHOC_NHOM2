document.addEventListener("DOMContentLoaded", () => {

    let btn = document.getElementById('btnChangePass');
    btn.addEventListener('click', async (e) => {
        e.preventDefault();


        let password = document.getElementById('password').value;
        let new_pass = document.getElementById('new_password').value;
        let new_pass_confirm = document.getElementById('new_password_confirm').value;

        if(password.length == 0 || new_pass.length == 0|| new_pass_confirm == 0){
            alert("Vui lòng điền đầy đủ các trường thông tin!");
            return;
        }


        if (new_pass.length < 8 || new_pass_confirm < 8) {
            alert("Vui lòng nhập mật khẩu mới dài hơn 8 ký tự!");
            return;
        }

        if (new_pass !== new_pass_confirm) {
            alert("Mật khẩu mới không trùng nhau. Vui lòng nhập lại!");
            return;
        }

        try {
            const res = await apiFetch(`${URL_BE}/api/change-pass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password,
                    new_pass: new_pass,
                })
            });

            const results = await res.json();

            if (!res.ok) {
                throw new Error(results.message);
            }

            let check = results.tus;

            if (!check) {
                alert("Mật khẩu không đúng!");
                return;
            }

            alert("Đã đổi mật khẩu thành công");

            try {
                const res = await apiFetch(`${URL_BE}/api/logout`, {
                    method: "POST",
                    credentials: "include"
                });

                const data = await res.json();

                // alert(data.message);

                window.location.href = "login.html";

            } catch (error) {
                console.error("Lỗi khi đăng xuất: ", error);
            }

        } catch (error) {
            alert(error);
            console.error('Lỗi khi đổi mật khẩu:', error);
        }
    });
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


            window.location.href = "login.html";

        } catch (error) {
            console.error("Lỗi khi đăng xuất: ", error);
        }
    }
});