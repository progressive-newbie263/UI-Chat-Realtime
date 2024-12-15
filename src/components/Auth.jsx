import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

//khởi tạo initial state để gửi data sang backend.
const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  //the logged result of the form return the array of objects everytime there is 
  //any small changes
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    //console.log(form);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(form);
    const { username, password, phoneNumber, avatarURL } = form;

    //fetch dữ liệu từ backend:
    const URL = 'http://localhost:5000/auth';

    //destructure data lấy ra các dữ liệu: token, userId, hashedPassword
    //nó sẽ trả về route login hoặc route signup, phụ thuộc vào việc login hay chưa.
    const { 
      data: {token, userId, hashedPassword, fullName} 
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login" }`, {
      //pass các dữ liệu này vào.
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if (isSignup) {
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    window.location.reload(); //tự động load page sau mỗi lần submit thông
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  
  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>

          <form onSubmit={handleSubmit}>
            {/* 
              form hiển thị cho sign up. Khi đăng kí, ta cần hiển thị Full Name. 
              Những lần sau đó, khi đăng nhập thì ko cần 
            */}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='fullName'>Full Name</label>
                <input 
                  name='fullName' 
                  type='text' 
                  placeholder='Eg: Nguyen Van A, ...' 
                  onChange={handleChange} 
                  required
                />
              </div>
            )}

            {/* 
              form hiển thị chung (tức là cả khi sign up và 
              sign in, ta sẽ đăng nhập với username 
            */}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='username'>Username</label>
              <input 
                name='username' 
                type='text' 
                placeholder='Eg: jackfrost2004' 
                onChange={handleChange} 
                required
              />
            </div>

            {/* 
              form hiển thị SĐT, chỉ dùng cho sign up
            */}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input 
                  name='phoneNumber' 
                  type='text' 
                  placeholder='Eg: 0123456789' 
                  onChange={handleChange} 
                  required
                />
              </div>
            )}

            {/* 
              form hiển thị User PFP(avatar). Chỉ dùng cho sign up
            */}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='avatarURL'>Avatar URL</label>
                <input 
                  name='avatarURL' 
                  type='text' 
                  placeholder='Avatar URL:' 
                  onChange={handleChange} 
                  required
                />
              </div>
            )}

            {/* 
              form hiển thị mật khấu. Dùng cho cả signup/signin
            */}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='password'>Password</label>
              <input 
                name='password' 
                type='password' 
                placeholder='Type in your password:' 
                onChange={handleChange} 
                required
              />
            </div>

            {/* 
              form hiển thị nhập lại mật khấu. Dùng cho mình signup, để 
              người dùng xác nhận mật khẩu trước khi đăng kí.
            */}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input 
                  name='confirmPassword' 
                  type='password' 
                  placeholder='Confirm your password:' 
                  onChange={handleChange} 
                  required
                />
              </div>
            )}

            <div className='auth__form-container_fields-content_button'>
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>

          <div className='auth__form-container_fields-account'>
            <p>
              {isSignup 
                ? "Already have an account ?"
                : "Don't have an account?" 
              }

              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className='auth__form-container_image'>
        <img src={signinImage} alt='sign in' />
      </div>
    </div>
  )
}

export default Auth