import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Google login callback
  const handleCredentialResponse = (response) => {
    if (response.credential) {
      localStorage.setItem("userToken", response.credential);
      navigate("/dashboard");
    } else {
     
      alert("Google login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignIn"),
        { theme: "outline", size: "large" }
      );

      google.accounts.id.prompt();
    }
  }, []);

  // OAuth response handler
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.slice(1));

    // GitHub OAuth
    const githubCode = searchParams.get("code");
    const githubError = searchParams.get("error");
    if (githubCode) {
     
      localStorage.setItem("userToken", githubCode); // replace with backend token exchange
      navigate("/dashboard");
      window.history.replaceState({}, document.title, "/");
    } else if (githubError) {
      alert("GitHub login failed or was cancelled.");
      navigate("/");
      window.history.replaceState({}, document.title, "/");
    }

    // Facebook OAuth
    const facebookToken = hashParams.get("access_token");
    if (facebookToken) {
      localStorage.setItem("userToken", facebookToken);
      navigate("/dashboard");
      window.history.replaceState({}, document.title, "/");
    } else if (window.location.href.includes("facebook.com")) {
      alert("Facebook login failed or was cancelled.");
      navigate("/");
      window.history.replaceState({}, document.title, "/");
    }
  }, [navigate]);

  // GitHub login redirect
  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = "http://localhost:5173/"; // MUST match GitHub OAuth app callback URL
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  };

  // Facebook login redirect
  const handleFacebookLogin = () => {
    const clientId = import.meta.env.VITE_FACEBOOK_CLIENT_ID;
    const redirectUri = "http://localhost:5173/"; // MUST match Facebook redirect URI setting
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
  };

  // Local login form handler
  const handleFormLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      localStorage.setItem("userToken", "fake-jwt-token");
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      alert("❌ Invalid credentials. Try username: admin / password: 1234");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {/* Local login form */}
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
        <div className="mb-4 text-gray-600 text-sm">or</div>

        {/* Google login */}
        <div id="googleSignIn" className="mb-4"></div>

        {/* GitHub login */}
        <button
          onClick={handleGithubLogin}
          className="w-full bg-gray-800 text-white py-2 rounded mb-2 hover:bg-gray-700"
        >
          Continue with GitHub
        </button>

        {/* Facebook login */}
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
