'use client';

import { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/lib/firebase/firebaseConfig'; // Assurez-vous que ce chemin est correct
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation'; // Assurez-vous d'importer 'useRouter' depuis 'next/router'
import { useLoading } from "@/components/loading/loadingProvider"; // Assurez-vous que ce chemin est correct
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import NextLink from 'next/link';
import Layout from "@/components/layout/Layout"; // Assurez-vous que ce chemin est correct

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(firebaseAuth);
  const { setIsLoading } = useLoading();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const userCredentials = await signInWithEmailAndPassword(email, password);
      if (userCredentials) {
        setError('');
        setEmail('');
        setPassword('');
        if (setIsLoading) setIsLoading(true);
        router.push('/dashboard');
      } else setError('Email or password is incorrect');
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  return (
    <Layout headerStyle={1}>
      <section className="bg-sign-in" style={{ height: "100vh" }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="sign-in-form mx-auto">
                <h2>SIGN IN</h2>
                <p>Welcome back! Please enter your details</p>
                <form onSubmit={handleLogin} id="contactform">
                  <fieldset>
                    <input
                      id="email"
                      name="email"
                      tabIndex={1}
                      aria-required="true"
                      required
                      type="text"
                      placeholder="Username or Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </fieldset>
                  <fieldset>
                    <input
                      id="password"
                      name="password"
                      tabIndex={2}
                      aria-required="true"
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </fieldset>
                  <div className="forgot-pass-wrap">
                    <label>
                      <input type="checkbox" />
                      <span className="btn-checkbox" />
                      Remember me
                    </label>
                    <NextLink href="#" className="forgot-pass-link">Forgot your password?</NextLink>
                  </div>
                  {error && <Typography color="error">{error}</Typography>}
                  <button className="tf-button submit" type="submit">SIGN IN</button>
                </form>
                <div className="choose-sign">
                  Do you have account? <NextLink href="#">Sign up for free</NextLink>
                </div>
                <div className="or"><span>or</span></div>
                <div className="box-sign-social">
                  <NextLink className="tf-button" href="#"><i className="fab fa-google" />Google</NextLink>
                  <NextLink className="tf-button" href="#"><i className="fab fa-facebook-f" />Facebook</NextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
