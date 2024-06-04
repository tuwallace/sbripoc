'use client'
import React, { useEffect, useState } from 'react'
import { createAsset, editAsset, getAsset } from '../actions'
import BasicPersonType from './interfaces/basicPersonType'
import EditAssetProps from './interfaces/resumeProps'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'


const AssetEdit =  ({assetId}:{assetId:string}) => {

  const router = useRouter()

  const[currentAsset,setCurrentAsset] = useState<BasicPersonType>()

  let ua:BasicPersonType

  useEffect(() => {
    const fetchData = async (elementId:string) =>{
     const rc = await getAsset(elementId)
      return rc
    }
      fetchData(assetId).then((x)=>{
       let s:BasicPersonType = JSON.parse(x)
       console.log(`asset edit => `, s.assetID)       
       setCurrentAsset(s)
    
    }).catch(console.error)

},[])
  
  const back = async () => {
    router.push("/") 
  }

  function SubmitButton() {
    const { pending, data, method, action  } = useFormStatus();
  
    return (
      <button type="submit" disabled={pending} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" aria-disabled={pending}>
        Sumbit Asset
      </button>
    );
  }

  const translateAssetType = (typeId: string) =>{
    if(typeId === '5'){
      return "Radar"
    }else if (typeId === '1'){
      return  'Video'
    }else if (typeId === '2'){
      return 'Image'
    }else if(typeId === '3'){
      return 'Speech'
    }else if(typeId === '4'){
      return 'Sonar'
    }else{
      return 'Document'
    }
  }
  const submitAsset = async () => {
    let myFormData = new FormData()
  }

  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Edit Asset</h1>
        <p className="py-6">Please provide the request information to edit the selected asset</p>
        <div>
          <span className=' text-xl font-bold'>Asset Id:</span>: {currentAsset === undefined ? "" : currentAsset!.assetID}<br/>
          <span className=' text-xl font-bold'>Asset Name:</span>: {currentAsset === undefined ? "" :currentAsset!.name}<br/>
          <span className=' text-xl font-bold'>Origin:</span>: {currentAsset === undefined ? "" :currentAsset!.origin}<br/>
          <span className=' text-xl font-bold'>Asset Type:</span>: {translateAssetType(currentAsset === undefined ? "" : currentAsset!.typeId)}
          </div>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body"  action={editAsset}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>File</span>
            </label>
            <input type="file" name="file" id="file" autoComplete="off" className="file-input file-input-primary file-input-bordered w-full max-w-xs" required />
          </div>
        <div className="form-control"> 
            <label className="label">
              <span className="label-text">Origin</span>
            </label>
            <input type="input" name="origin" id="origin" autoComplete="off" placeholder="What is origin of the asset" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="input" name="name" id="name" autoComplete="off" placeholder="Enter the name of asset" className="input input-bordered" required /> 
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

          <input type="hidden" value={currentAsset === undefined ? "" : currentAsset!.checkSum} name="checkSum" id="CheckSum" className="input input-bordered" readOnly/>
    
          <div className="form-control mt-6">
            {/* <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" type="submit">Submit</button> */}
            <SubmitButton/>
           
          </div>
        </form>
         <button className='btn btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-lg' onClick={back}>Back</button>
      </div>
    </div>
  </div>

  )
}

export default AssetEdit