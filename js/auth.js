document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const logoutBtn = document.getElementById("logoutBtn");

    // Handle Signup
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            // Save user data (in localStorage for demo purposes)
            localStorage.setItem("user", JSON.stringify({ name, email, password }));
            alert("Signup successful! Redirecting to login.");
            window.location.href = "index.html";
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const user = JSON.parse(localStorage.getItem("user"));

            if (user && user.email === email && user.password === password) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                alert("Login successful! Redirecting to dashboard.");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid credentials. Please try again.");
            }
        });
    }

    // Show logged-in user in dashboard
    if (document.getElementById("userName")) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            document.getElementById("userName").innerText = loggedInUser.name;
        } else {
            window.location.href = "index.html"; // Redirect if not logged in
        }
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }
});
