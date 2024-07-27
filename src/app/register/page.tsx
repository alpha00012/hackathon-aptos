'use client'
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/lib/firebase/firebaseConfig';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(firebaseAuth);
  const db = getFirestore();
  const router=useRouter()
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const credentials = await createUserWithEmailAndPassword(email, password);
      setUserName('');
      setEmail('');
      setPassword('');
      setDoc(doc(db, "users", credentials.user.uid), {
        email: email,
        username: username
      })
      .then(res => {
        alert("Registration done");
        setError("");
        setTimeout(()=>{},50)
        router.push("/dashboard")
      })
      .catch(err => {
        setError("Internal Error");
      });
    } catch (error) {
      setError("Email already in use!");
      console.error(error);
    }
  }

  return (
    <Box className="flex w-full h-screen justify-center items-center bg-green-50"
    style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100vh'
        }}>
      <div className="flex h-full items-center justify-center max-w-5xl bg-white shadow-md relative ">
      <div className="absolute top-10 left-6">
          <button 
            onClick={() => router.push("/")} 
            className="flex items-center text-green-900 hover:text-green-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Go Back</span>
          </button>
        </div>
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <div className="flex flex-col items-start">
            <Typography variant="h4" className="text-3xl font-extrabold text-green-700">
              Welcome to Live Tounsi.
            </Typography>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
          <TextField
          id="outlined-basic"
          label="username"
          variant="standard"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          className='rounded-md'
          required
        />
        <TextField
          id="outlined-basic"
          label="email"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          className='rounded-md'
          required
        />
        <TextField
          id="outlined-basic"
          label="password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          className='rounded-md'
          required
        />
        {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: 'green',
                '&:hover': {
                  backgroundColor: 'darkgreen',
                },
              }}
            >
              Sign Up
            </Button>
            <Typography className="text-blue-950 mt-4">
              You have an account?{' '}
              <Link href="/login" className="text-green-400 hover:underline">
                Sign In
              </Link>
            </Typography>
          </form>
        </div>
        <div className="w-full md:w-1/2 h-full hidden md:block">
          <img className="object-cover w-full h-full" src="/images/summer.jpg" alt="Beach" />
        </div>
      </div>
    </Box>
  );

}

export default Register;






