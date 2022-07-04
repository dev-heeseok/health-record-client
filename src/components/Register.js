import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import consoleDebug, { RENDER } from '../hooks/useLogging';

// const USER_REGEX = /^[A-z][A-z0-9-_]{3, 23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/users/register";

const Register = () => {
  consoleDebug("Register is rendered ...", RENDER);

  const errMsgRef = useRef();
  const emailRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");

  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatchPwd, setValidMatchPwd] = useState(false);

  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPwd, setFocusPwd] = useState(false);
  const [focusMatchPwd, setFocusMatchPwd] = useState(false);

  useEffect(() => {
    consoleDebug("email focus");
    emailRef.current?.focus();
  }, []);
  useEffect(() => {
    consoleDebug("email validation");
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])
  useEffect(() => {
    consoleDebug("pwd validation");
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatchPwd(pwd === matchPwd);
  }, [pwd, matchPwd]);
  useEffect(() => {
    consoleDebug("errMsg reset");
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    consoleDebug('onSubmit');

    e.preventDefault();

    const passEmail = EMAIL_REGEX.test(email);
    const passPwd = PWD_REGEX.test(pwd);
    if (!passEmail || !passPwd) {
      setErrMsg("Invalid Entry");
      return;
    }

    await axios
      .post(REGISTER_URL, {
        email: email,
        password: pwd
      })
      .then(res => {
        const registered = res?.data?.success;
        setSuccess(registered);

        setEmail("");
        setPwd("");
        setMatchPwd("");
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else {
          setErrMsg("Registeration Failed");
        }

        errMsgRef.current?.focus();
      });
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href='/#'>Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errMsgRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>
              Email:
              <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
            />
            <p
              id="emailnote"
              className={focusEmail && email && !validEmail ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              that is supposed to match xxx@xxxxxx.xxx like emails.
            </p>

            <label htmlFor="pwd">
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="pwd"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "true" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setFocusPwd(true)}
              onBlur={() => setFocusPwd(false)}
            />
            <p
              id="pwdnote"
              className={focusPwd && pwd && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hasttag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="matchPwd" >
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={validMatchPwd && matchPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatchPwd || !matchPwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="matchPwd"
              autoComplete="off"
              onChange={(e) => { setMatchPwd(e.target.value) }}
              value={matchPwd}
              required
              aria-invalid={validMatchPwd ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setFocusMatchPwd(true)}
              onBlur={() => setFocusMatchPwd(false)}
            />
            <p
              id="confirmnote"
              className={focusMatchPwd && matchPwd && !validMatchPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button disabled={!validEmail || !validPwd || !validMatchPwd ? true : false}>
              Sign Up
            </button>
          </form>

          <p>
            Already registered?<br />
            <span className="line">
              <Link to="/">Sign In</Link>
            </span>
          </p>

        </section>
      )}
    </>
  )
}

export default Register