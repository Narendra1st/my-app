// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // ✅ Handle Google login response
//   const handleCredentialResponse = (response) => {
//     console.log("Google JWT Token:", response.credential);
//     localStorage.setItem("userToken", response.credential);
//     navigate("/dashboard");
//   };

//   // ✅ Initialize Google button
//   useEffect(() => {
//     /* global google */
//     if (window.google) {
//       google.accounts.id.initialize({
//         client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com", // replace
//         callback: handleCredentialResponse,
//       });

//       google.accounts.id.renderButton(
//         document.getElementById("googleSignIn"),
//         { theme: "outline", size: "large" }
//       );

//       google.accounts.id.prompt();
//     }
//   }, []);

//   // ✅ GitHub login redirect
//   const handleGithubLogin = () => {
//     const clientId = "Ov23livpGkzinvEXkK5C"; // replace
//     const redirectUri = "http://localhost:5173/dashboard";
//     window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
//   };

//   //facebook redirect
//   const handleFacebookLogin = () => {
//     const clientId = "1229941992223371";
//     const redirectUri = "http://localhost:5173/dashboard";
//     window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
//   };

//   //local login (username + password)
//   const handleFormLogin = (e) => {
//     e.preventDefault();
//     if (username === "admin" && password === "1234") {
//       console.error("❌ Invalid credentials: ", { username, password });
//       localStorage.setItem("userToken", "fake-jwt-token");
//       localStorage.setItem("username", username);
//       navigate("/dashboard");
//     } else {

//       alert("Invalid credentials. Try admin / 1234 🙂");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96 text-center">
//         <h1 className="text-2xl font-bold mb-4">Login</h1>

//         {/* Username + Password Login */}
//         <form onSubmit={handleFormLogin} className="mb-6">
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full border rounded px-3 py-2 mb-3"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border rounded px-3 py-2 mb-3"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
//           >
//             Login
//           </button>
//         </form>

//         <hr className="mb-6" />

//         {/* Google */}
//         <div id="googleSignIn" className="mb-4"></div>

//         {/* GitHub */}
//         <button
//           onClick={handleGithubLogin}
//           className="w-full bg-gray-800 text-white py-2 rounded mb-2 hover:bg-gray-700"
//         >
//           Continue with GitHub
//         </button>

//         {/* Facebook */}
//         <button
//           onClick={handleFacebookLogin}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
//         >
//           Continue with Facebook
//         </button>

//         <p className="mt-4 text-sm">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-blue-500">
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Handle Google login response
  const handleCredentialResponse = (response) => {
    console.log("Google JWT Token:", response.credential);
    localStorage.setItem("userToken", response.credential);
    navigate("/dashboard");
  };

  // ✅ Initialize Google button
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com", // replace with your actual client ID
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
        theme: "outline",
        size: "large",
      });

      google.accounts.id.prompt();
    }
  }, []);

  // ✅ GitHub login redirect
  const handleGithubLogin = () => {
    const clientId = "Ov23livpGkzinvEXkK5C"; // replace with your actual client ID
    const redirectUri = "http://localhost:5173/dashboard";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  };

  // ✅ Facebook login redirect
  const handleFacebookLogin = () => {
    const clientId = "1229941992223371"; // replace with your actual client ID
    const redirectUri = "http://localhost:5173/dashboard";
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
  };

  // ✅ Local login (username + password)
  const handleFormLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      console.log("✔️ Successfully logged in!");
      localStorage.setItem("userToken", "fake-jwt-token");
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      alert("❌ Invalid credentials. Try username: admin / password: 1234");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {/* Username + Password Login */}
        <form onSubmit={handleFormLogin} className="mb-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
          >
            Login
          </button>
        </form>

        <hr className="mb-6" />
        <div className="mb-4 flex items-center justify-center">
          <span className="text-sm text-gray-600">or</span>
        </div>
        {/* Google Login Button */}
        <div id="googleSignIn" className="mb-4"></div>

        {/* GitHub Login */}
        <button
          onClick={handleGithubLogin}
          className="w-full bg-gray-800 text-white py-2 rounded mb-2 hover:bg-gray-700"
        >
          Continue with GitHub
        </button>

        {/* Facebook Login */}
        <button
          onClick={handleFacebookLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
        >
          Continue with Facebook
        </button>

        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
