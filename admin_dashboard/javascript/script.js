document.addEventListener("DOMContentLoaded", function () {
  // ✅ XÓA DỮ LIỆU LOCALSTORAGE CÓ SẴN (nếu muốn reset)
  localStorage.removeItem("users");
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("role");

  // ✅ XỬ LÝ ĐĂNG NHẬP
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Username:", username);
    console.log("Password:", password);

    // Lấy danh sách users từ localStorage
    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("users")) || [];
    } catch (e) {
      console.error("Không thể đọc dữ liệu users từ localStorage:", e);
    }

    // Nếu chưa có users, tạo mặc định
    if (!Array.isArray(users) || users.length === 0) {
      users = [
        { username: "admin1", password: "admin321", role: "admin" },
        { username: "user1", password: "user321", role: "user" },
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }

    console.log("Danh sách users:", users);

    // Tìm user trùng khớp
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", username);
      localStorage.setItem("role", user.role);
      alert("Đăng nhập thành công!");
      if (user.role === "admin") {
        window.location.href = "/admin_dashboard/page/admin.html";
      } else {
        window.location.href = "/page/home.html";
      }
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  });

  // ✅ CẬP NHẬT ICON NGƯỜI DÙNG
  function updateUserIcon() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const role = localStorage.getItem("role");
    const userIcon = document.getElementById("user-icon");

    if (!userIcon) return;

    if (loggedInUser) {
      userIcon.classList.remove("fa-user");
      userIcon.classList.add("fa-sign-out-alt");
      userIcon.title = "Đăng xuất (" + loggedInUser + ")";
      userIcon.removeAttribute("href");

      userIcon.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("role");
        alert("Đã đăng xuất!");
        window.location.href = "login.html";
      });
    } else {
      userIcon.classList.remove("fa-sign-out-alt");
      userIcon.classList.add("fa-user");
      userIcon.title = "Đăng nhập";
      userIcon.setAttribute("href", "login.html");
      userIcon.replaceWith(userIcon.cloneNode(true));
    }
  }

  updateUserIcon();
  window.addEventListener("storage", updateUserIcon);
});
