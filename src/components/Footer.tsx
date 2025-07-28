'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import Contact from './contact/Contact'
import AOS from 'aos';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
export default function Footer() {

    useEffect(()=>{
        AOS.init()
        },[])
  return (

<div
className=" bg-gradient-to-tr from-[#ffe8f2] to-[#e2dfff]  border-t border-indigo-500 pt-20 relative ">


    {/* contact form */}

    <div
    style={{transform:'translateX(-50%)'}}
    className=' absolute top-[-180px] w-full left-[50%] md:px-0 px-5'>
<Contact AOS={AOS}/>
    </div>
{/* top gradient */}

<div
style={{background:' linear-gradient(0deg, rgba(250,252,255,1) 0%, rgba(0,0,0,1) 100%)'}}
className='w-full h-full z-[-10] backdrop-blur-xl absolute top-0 left-0'></div>
  <div className=" mx-auto lg:px-40 md:px-20 pt-52 px-10">
    <div className="flex flex-wrap text-left justify-between lg:text-left">
      <div className="">
      <h4
      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-rose-500 text-4xl font-extrabold bg-transparent"
    >Mayukh Das</h4>
        <h5 className=' text-indigo-900 mt-2 text-lg font-semibold hover:text-indigo-800 duration-200 transition-all'>
        CourShala provides a wide range of e-learning services under one roof.
        </h5>
        <div className="mt-6 lg:mb-0 mb-6">
            <Link href='https://www.linkedin.com/in/mayukh-das-536185238/'>
            <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <LinkedInIcon className=' text-blue-700'/></button>

            </Link>

            <Link href='https://github.com/Mayukhy'>
            <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <GitHubIcon/>
            </button>

            </Link>


            {/* <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-dribbble"></i></button><button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-github"></i>
          </button> */}
        </div>
      </div>

      <div className=' flex gap-3'>
        <div>
        <p className=' font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-blue-700'>Importent Links</p>
        <div className=' flex flex-col mt-2 gap-1'>
          <Link href='/projects' className=' text-indigo-700 font-semibold hover:text-indigo-800 duration-200 transition-all hover:underline underline-offset-auto'>Projects</Link>
          <Link href='/projects' className=' text-indigo-700 font-semibold hover:text-indigo-800 duration-200 transition-all hover:underline underline-offset-auto'>Skills</Link>
          <Link href='/projects' className=' text-indigo-700 font-semibold hover:text-indigo-800 duration-200 transition-all hover:underline underline-offset-auto'>About</Link>
        </div>
        </div>
 

      </div>

    </div>
    <hr className="mt-6 my-2 border-zinc-300 "/>
    <div className="flex flex-wrap pb-16 items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2023</span>
          <a href="https://www.linkedin.com/in/mayukh-das-536185238/" className="text-blueGray-500 hover:text-gray-800" target="_blank"/> Mayu
          <a href="https://www.linkedin.com/in/mayukh-das-536185238/" className="text-blueGray-500 hover:text-blueGray-800">kh Das</a>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
