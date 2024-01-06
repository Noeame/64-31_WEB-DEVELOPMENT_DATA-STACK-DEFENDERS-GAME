import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Add Firebase products that you want to use
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGK206E9S077LKvQsK_XISHrRvS9NkqYM",
    authDomain: "bridgethegap-1dcbe.firebaseapp.com",
    projectId: "bridgethegap-1dcbe",
    storageBucket: "bridgethegap-1dcbe.appspot.com",
    messagingSenderId: "971823065997",
    appId: "1:971823065997:web:827dc0ab980b1d9245ebc4",
    measurementId: "G-GPL83XWZK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Function to register a new user
// function registerUser() {
//     const name = document.getElementById("userRegisterEmail").value;
//     const password = document.getElementById("userRegisterPassword").value;

//     auth.createUserWithEmailAndPassword(name, password)
//         .then((userCredential) => {
//             // Registration successful
//             const user = userCredential.user;
//             console.log('Registration successful:', user);
//             createLevelTableIfNeeded(user.uid); // Create level table after successful registration
//         })
//         .catch((error) => {
//             // Handle registration errors
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.error('Registration error:', errorCode, errorMessage);
//         });
// }

document.getElementById("registerName").addEventListener("keyup", async (e) => {
    const name = document.getElementById("registerName").value;
    document.getElementById("error").style.display = "none";

    //   document.getElementById("error").style.display = 'none'
    console.log(name);
    if (e.key === "Enter") {
        console.log(e.key);
        fetch("https://bridgethegap-1dcbe-default-rtdb.firebaseio.com/user.json")
            .then((response) => response.json())
            .then((data) => {
                // Assuming your Firebase structure has emails nested under unique user IDs
                const emails = Object.values(data).map((user) => user?.name);

                if (emails.includes(name)) {
                    document.getElementById("error").style.display = "none";
                    console.error("Email already exists");
                    localStorage.setItem("UserName",name)
                    window.location.href = "level-select.html"
                    // Handle the error, name is not unique
                }
                else{
                    document.getElementById("error").style.display = "block";

                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                // Handle the error when fetching data
            });
    }
});
