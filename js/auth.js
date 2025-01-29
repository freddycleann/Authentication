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
            const confirmPassword = document.getElementById("confirmPassword").value;

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            // Store user data correctly
            const userData = { name, email, password };
            localStorage.setItem("user_" + email, JSON.stringify(userData));

            alert("Signup successful! Redirecting to login.");
            window.location.href = "index.html";
        });
    }

    // Handle Login
    // Handle Login
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = document.getElementById("loginEmail").value.trim(); // User can enter email or name
        const password = document.getElementById("loginPassword").value;

        let foundUser = null;

        // Loop through localStorage to find a matching user
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("user_")) {
                const user = JSON.parse(localStorage.getItem(key));

                // Check if the input matches either email or name
                if (user.email === input || user.name === input) {
                    foundUser = user;
                    break;
                }
            }
        }

        if (!foundUser) {
            alert("User not found. Please sign up first.");
            return;
        }

        // Check if password matches
        if (foundUser.password === password) {
            localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
            alert("Login successful! Redirecting to dashboard.");
            window.location.href = "dashboard.html";
        } else {
            alert("Incorrect password. Please try again.");
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
