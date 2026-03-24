document.addEventListener("DOMContentLoaded", () => {

    let btn = document.getElementById('btnChangePass');
    btn.addEventListener('click', async (e) => {
        e.preventDefault(); 

    
        let password = document.getElementById('password').value;
        let new_pass = document.getElementById('new_password').value;
        let new_pass_confirm = document.getElementById('new_password_confirm').value;

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
            
            if(!res.ok){
                throw new Error(data.message);
            }

            let check = results.tus;

            if (!check) {
                alert("Mật khẩu không đúng!");
                return;
            }

            alert("Đã đổi mật khẩu thành công");

            

        } catch (error) {
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

            alert(data.message);

            window.location.href = "login.html";

        } catch (error) {
            console.error("Lỗi khi đăng xuất: ", error);
        }
    }
});