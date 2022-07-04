import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import axios from 'axios';

import consoleDebug, { RENDER } from '../hooks/useLogging';
import useAuth from '../hooks/useAuth'

const LOGIN_URL = "/api/users/login";

const Login = () => {
  consoleDebug("Login is rendered ...", RENDER);

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  consoleDebug(`from ${from}`);

  const errMsgRef = useRef();
  const emailRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    consoleDebug("email focus");
    emailRef.current?.focus();
  }, []);
  useEffect(() => {
    consoleDebug("errMsg reset");
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    consoleDebug('onSubmit');
    e.preventDefault();

    await axios
      .post(LOGIN_URL, {
        email: email,
        password: pwd
      })
      .then(res => {
        const accessToken = res?.data?.accessToken;
        const roles = res?.data?.roles;

        setAuth({ email, pwd, roles, accessToken });
        setEmail("");
        setPwd("");

        navigate(from, { replace: true });
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err?.response.status === 400) {
          setErrMsg("Missing Email or Password");
        } else if (err?.response.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }

        errMsgRef.current?.focus();
      });
  }

  return (
    <section>
      <p
        ref={errMsgRef}
        className={errMsg ? "errmsg" : "offscreen"}
      >
        {errMsg}
      </p>

      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor='password'>Password</label>
        <input
          type="password"
          id="password"
          autoComplete="on"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />

        <button>Sign In</button>
      </form>

      <p>
        Need an Account?<br />
        <span className='line'>
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  )
}

export default Login