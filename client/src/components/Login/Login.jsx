import React from "react";
import "../Login/Login.css"
import Signup from "./../Signup/Signup"


$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});

function Login() {
  const mystyle = {
    color: "black",
    borderRadius: "20px",
    backgroundColor: "white"
  }
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2>Login Form</h2>
        <form className="login">
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="email-input" placeholder="Email" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password-input" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default" style={mystyle}>Login</button>
        </form>
        <br />
        {/* <p>Or sign up <a href={Signup}>here</a></p> */}
      </div>
    </div>
  </div>
  );
}
export default Login;