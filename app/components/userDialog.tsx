'use client'
import React from 'react'
import { createAsset } from '../actions'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'



const UserDialog =  ({account,}:{account : React.ReactNode}) => {

  const router = useRouter()

  const back = async () => {
    router.push("/") 
  }

  function SubmitButton() {
    const { pending,data, method, action  } = useFormStatus();
    console.log('submitting new asset ->',pending)
  
    return (
      <button type="submit" disabled={pending} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" aria-disabled={pending}>
        Sumbit Asset
      </button>
    );
  }

  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">New Asset</h1>
        <p className="py-6">Please provide the request information to create your asset</p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body"  action={createAsset}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>File</span>
            </label>
            <input type="file" name="file" id="file" autoComplete='off' className="file-input file-input-primary file-input-bordered w-full max-w-xs" required />
          </div>
        <div className="form-control"> 
            <label className="label">
              <span className="label-text">Origin</span>
            </label>
            <input type="input" name="origin" id="origin"  autoComplete='off' placeholder="What is origin of the asset" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="input" name="name" id="name"  autoComplete='off' placeholder="Enter the name of asset" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Asset Type</span>
            </label>
            <select name="typeId" id="typeId" defaultValue={'100'} className="select select-bordered w-full max-w-xs">
              <option value={'100'} disabled>Select an asset type</option>
              <option value={'0'}>Document</option>
              <option value={'1'}>Video</option>
              <option value={'2'}>Image</option>
              <option value={'3'}>Speech</option>
              <option value={'4'}>Sonar</option>
              <option value={'5'}>Radar</option>
            </select>
          </div>

          {/* <input type="hidden" value={account as string} name="account" id="account" className="input input-bordered" readOnly/>
   */}
          <div className="form-control mt-6">
            <SubmitButton/>
            
          </div>
        </form>
        <button className='btn btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-lg' onClick={back}>Back</button>
      </div>
    </div>
  </div>

  )
}

export default UserDialog