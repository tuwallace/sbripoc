'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BlobOptions } from 'buffer'



const NavBar = ({account, currentName,currentEmail,currentElementId,isEmployer}:{account: string, currentName: string | undefined,currentEmail: string | undefined,currentElementId: string |undefined,isEmployer: boolean | undefined}) => {
    const [theme, setTheme] = useState('light')

    const toogleTheme = (e: any) => {
      if(e.target.checked){
        setTheme('dark')
        localStorage.setItem("theme", 'dark')
       // console.log('navbar toogleTheme => current theme dark')

      }else{
        setTheme('light')
        localStorage.setItem("theme", 'light')
        //console.log('navbar toogleTheme => current theme light')
       }
      
    }

    useEffect(() => {    
      const localTheme = localStorage.getItem('theme') === null ? 'light' : localStorage.getItem('theme')
       document.querySelector('html')?.setAttribute('data-theme',localTheme as string)     
       setTheme(localTheme as string)
       //console.log('useEffect theme is', theme)
    },[theme])

  return (
<div className="navbar bg-base-100 z-10">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
     
         <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
         <li><Link href={`/`}>Home</Link></li>
         {/* <li><Link href={`/profile/${currentElementId}`}>My Profile</Link></li>
         <li><Link href={`/resume/${currentElementId}/my/${currentElementId}/2`}>My Resume</Link></li>
         <li><Link href={`/resume/${currentElementId}/mint`}> Mint Resume</Link></li>
         <li><Link href={`/referral/${currentElementId}/list`}> My Resume Collection</Link></li>

         {isEmployer && ( <li><Link href={`/jobs/${currentElementId}/cot`}> Manage Circle of Trust</Link></li>)}
        
        
         <li><Link href={`/jobs/${currentElementId}/rslisting`}>My Request for Resumes</Link></li>
         <li><Link href={`/jobs/${currentElementId}/selling`}>Selling Resumes</Link></li>
         
         {!isEmployer && (  <li><Link href={`/employer/${currentElementId}/sub`}> Subscription</Link></li>) }
       
         <li><Link href={`/resume/${currentElementId}/sendEmail`}>Invite Candidate</Link></li> */}
       </ul>
      
     
    </div>
  </div>
  <div className="navbar-center">
    { currentName === undefined && ( <a className="normal-case font-extrabold lg:text-lg md:text-md sm:text-sm xs:text-xs px-5">SBRI Proof of Concept</a>)}
    { currentName !== undefined && ( <a className="normal-case font-extrabold lg:text-lg md:text-md sm:text-sm xs:text-xs px-5">SBRI Poof of Concept - {currentName}</a>)}
  </div>
  <div className="navbar-end">
    
    <button className="btn btn-ghost btn-circle lg:btn-lg md:btn-md sm:btn-sm xs:btn-xs ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <button className="btn btn-ghost btn-circle lg:btn-lg md:btn-md sm:btn-sm xs:btn-xs">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>

    <label className="swap swap-rotate">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" checked={theme === 'light' ? false : true} onChange={toogleTheme}/>
  
  {/* sun icon */}
  <svg className="swap-on fill-current w-5 h-5 stroke-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5.64,17l-.7
    1.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
    </svg>
  


  {/* moon icon */}
  <svg className="swap-off w-5 h-5 stroke-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
    </svg>




</label>

  </div>
</div>
)
}

export default NavBar