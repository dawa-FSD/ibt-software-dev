import { useLocation, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = () => {
    localStorage.setItem("isLoggedIn", "true");

    navigate(from, {
      replace: true,
    });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🔐</div>

        <h1>Sign In</h1>

        <p>Please sign in to continue to checkout.</p>

        <button className="primary-btn full" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </section>
  );
}

export default SignIn;
