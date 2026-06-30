import './sign-in-form.css'


const SignInForm = () => {
  return (
    <div className="container d-flex align-items-center text-center">
      <div className="form-signin">
        <form>
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt="Đây là Logo"
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div>
            <label>Email address</label>
            <input
              type="email"
              className="form-control email"
              id="floatingInput"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="form-control password"
              id="floatingPassword"
              placeholder="Password"
            />
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
