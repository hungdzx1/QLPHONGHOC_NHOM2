document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msgBox = document.getElementById("msgBox");
  const btnLogin = document.getElementById("btnLogin");

  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");
  const rememberEl = document.getElementById("remember");

  const togglePwd = document.getElementById("togglePwd");
  const forgotLink = document.getElementById("forgotLink");

  function showMsg(type, text) {
    msgBox.className = "msg " + type;
    msgBox.textContent = text;
    msgBox.style.display = "block";
  }

  // Quên mật khẩu (demo)
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Tính năng quên mật khẩu chưa được triển khai. Vui lòng liên hệ admin.");
  });

  // Toggle hiển thị mật khẩu
  togglePwd.addEventListener("click", () => {
    const isPwd = passwordEl.type === "password";
    passwordEl.type = isPwd ? "text" : "password";
    togglePwd.textContent = isPwd ? "Ẩn" : "Hiện";
  });

  // Auto fill nếu đã remember
  const saved = localStorage.getItem("mp_remember");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data?.username) usernameEl.value = data.username;
      rememberEl.checked = true;
    } catch (_) {}
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameEl.value.trim();
    const password = passwordEl.value;

    if (!username || !password) {
      showMsg("error", "Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    btnLogin.disabled = true;
    msgBox.style.display = "none";

    try {
      // Gửi yêu cầu đăng nhập tới API
      const res = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showMsg("error", data.message || "Đăng nhập thất bại.");
        btnLogin.disabled = false;
        return;
      }

      // Nếu đăng nhập thành công, lấy role từ API trả về
      const role = data.role || "USER"; // Lấy role từ response

      // Lưu thông tin vào session
      sessionStorage.setItem("mp_role", role); // Lưu role vào sessionStorage

      // Lưu thông tin username nếu người dùng chọn "remember me"
      if (rememberEl.checked) {
        localStorage.setItem("mp_remember", JSON.stringify({ username }));
      } else {
        localStorage.removeItem("mp_remember");
      }

      showMsg("ok", "Đăng nhập thành công! Đang chuyển trang...");

      setTimeout(() => {
        if (role === "ADMIN") window.location.href = "/admin.html"; // Chuyển đến trang admin nếu là admin
        else window.location.href = "/home.html"; // Chuyển đến trang người dùng
      }, 500);

    } catch (err) {
      showMsg("error", "Không kết nối được tới server/API.");
      btnLogin.disabled = false;
    }
  });
});