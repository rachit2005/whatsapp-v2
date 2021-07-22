import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { Button, withWidth } from "@material-ui/core";
import { auth, provider } from "../firebase";

const Login = () => {
  function signIn() {
    auth.signInWithPopup(provider).catch((e) => alert(e.message));
  }
  return (
    <Container>
      <Head>
        <title>login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://aspireinternetdesign.com/cms/wp-content/uploads/2014/12/benefits-of-live-chat-on-website.jpg" />
        <Button onClick={signIn} variant="outlined">
          Sign In with google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background-color: whitesmoke;
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 100px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  height: 200;
  width: 200px;
  margin-bottom: 50px;
`;
