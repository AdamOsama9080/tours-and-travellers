import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OneTimePassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const inputs = Array.from(form.querySelectorAll('input[type=text]'));
    inputsRef.current = inputs;

    const handleKeyDown = (e) => {
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'Tab' &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && e.target.value === '' && e.key !== 'Tab') {
        const index = inputs.indexOf(e.target);
        if (e.key === 'Backspace' && index > 0) {
          inputs[index - 1].value = '';
          inputs[index - 1].focus();
        }
      }
    };

    const handleInput = (e) => {
      const { target } = e;
      const index = inputs.indexOf(target);
      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    };

    const handleFocus = (e) => {
      e.target.select();
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text');
      if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
        return;
      }
      const digits = text.split('');
      inputs.forEach((input, index) => (input.value = digits[index]));
    };

    inputs.forEach((input) => {
      input.addEventListener('input', handleInput);
      input.addEventListener('keydown', handleKeyDown);
      input.addEventListener('focus', handleFocus);
      input.addEventListener('paste', handlePaste);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('input', handleInput);
        input.removeEventListener('keydown', handleKeyDown);
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('paste', handlePaste);
      });
    };
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = inputsRef.current.map(input => input.value).join('');
    setVerificationCode(code);
    
    try {
      const response = await axios.post('https://tours-api-7hh1.onrender.com/register/verify-otp', {
        email,
        otpCode: code,
      });

      setVerificationResult(response.data);
      console.log('Verification successful:', response.data);
      navigate('/signInUser');
      
    } catch (error) {
      console.error('Verification error:', error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="p-5 max-w-md text-center px-4 py-10 rounded-xl shadow col-md-7" ref={formRef}>
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-3">Write Your Verification Code</h1>
          <p className="text-[15px] text-slate-500 mb-4">
            Enter the 6-digit verification code that was sent to your email.
          </p>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center gap-3 text-black text-center align-items-center">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                type="text"
                className="form-control text-center text-black text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                style={{ width: `${100 / 6}%` }}
                maxLength="1"
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button type="submit" className="btn col-md-12" style={{ width: '100%', height: '3em', borderRadius: '0.9375em', backgroundColor: '#5F41B2', color: '#FFFFFF', fontFamily: 'Roboto', fontSize: '1rem', textTransform: 'none', margin: '2em 0' }}>Verify Code</button>
          </div>
        </form>
        {verificationResult && (
          <p>Verification Result: {JSON.stringify(verificationResult)}</p>
        )}
      </div>
    </div>
  );
};

export default OneTimePassword;
