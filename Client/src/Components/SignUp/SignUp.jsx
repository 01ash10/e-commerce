import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import styles from '../../Styles/styles';
import { Link } from 'react-router-dom';
import {RxAvatar} from 'react-icons/rx';
import axios from "axios";
import { server } from '../../server';

// import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [name, setFullName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
       setAvatar(file);
    
  };

const handleSubmit = (e) => {
e.preventDefault();
const config = {
  //if this header is not given, your file wont be taken
  headers: {"Content-Type": "multipart/form-data"},

};
const newForm = new FormData();
newForm.append("file", avatar);
newForm.append("name", name);
newForm.append("email", email);
newForm.append("password", password);

axios.post(`${server}/create-user`, newForm, config)
.then((res) =>{
  console.log(res.data.message);
  if(res.data.success==true){
    navigate('/')
  }
})
.catch((err) => console.log(err));
//api-link -> form data -> configurations ---syntax of axios

}

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'> Login to your account </h2>
      
      
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Full Name" className='block text-sm font-medium text-gray-700'> Full Name</label>

                <div className="mt-1">
            <input 
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

            type="text" 
            name='Name'
            autoComplete='Full Name'
            required
            placeholder='Full Name'
            value={ name}
            onChange={(e) => setFullName(e.target.value)}
            />
           </div>
            </div>
            <div>
                <label htmlFor="email"
                className='block text-sm font-medium text-gray-700'> Email Address</label>
           <div className="mt-1">
            <input 
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

            type="email" 
            name='email'
            autoComplete='email'
            required
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
           </div>
            </div>

            <div>
                <label htmlFor="password"
                className='block text-sm font-medium text-gray-700'> Password </label>
           <div className="mt-1 relative">
            <input 
            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

            type={visible ? "text": "password"}
            name='password'
            autoComplete='current-password'
            required
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {
                visible ? (<FaEyeSlash  className='absolute right-2 top-2 cursor-pointer' 
                size={25}
                onClick={()=> setVisible(false)}/>): (<FaEye className='absolute right-2 top-2 cursor-pointer' 
                size={25}
                onClick={() => setVisible(true)}

                />)
            }
           </div>
            </div>
<div>
    <label htmlFor="avatar"
    className='block text-sm font-medium text-gray-700'>

    </label>
    <div className='mt-12 flex items-center'>
        <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
            { avatar ? (
                      <img src={URL.createObjectURL(avatar)} alt="avatar" className='h-full w-full object-cover rounded-full'/>
                ): (
                  <RxAvatar className= "h-8 w-8"/>
                )
            }

        </span>
       <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 '>
        Upload file
        <input type="file"
         name='avatar' 
         id="file-input" 
         accept='.jpg, .jpeg, png'
          onChange={handleFileInputChange}
          className='sr-only ' />
       </label>
    </div>
</div>


<div>
    <button type='submit'
    className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>
     SIGN UP
    </button>
</div>
<div className={`${styles.normalFlex} w-full`}>
<h4>Already have an Account?</h4>
<Link to="/login" 
className="text-blue-600
pl-2"> Login
</Link>
</div>
            </form>
        </div>

      </div>
    </div>
  )
}

export default SignUp;
