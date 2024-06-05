'use client'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'

function S3UploadForm() {
    const[file,setFile] = useState(null)
    const[uploading, setUploading] = useState<boolean>(false)
    const[assetOrigin,setAssetOrigin] = useState<string>()
    const[assetName,setAssetName] = useState<string>()
    const[assetType,setAssetType] = useState<string>()

    const router = useRouter()

    const back = async () => {
        router.push("/") 
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(!file) return
        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append('origin', assetOrigin!)
        formData.append('name',assetName!)
        formData.append('type',assetType!)
        
    
        let currentDomain = window.location.origin;
        try{

            const response = await fetch(`${currentDomain}/api/s3upload`,{
                method: "POST",
                body:formData
            })
            const data = await response.json(); 
            console.log('results =>',response.status)
            setUploading(false)
        }catch(error){
            console.log(error)
            setUploading(false)
        }
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
       var t:any = event.target.files![0] as any
       setFile(t)
    }



  return (
   <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">New Asset to S3</h1>
        <p className="py-6">Please provide the request information to create your asset</p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body"  onSubmit={handleSubmit}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>File</span>
            </label>
            <input type="file" name="file" id="file"  onChange={handleFileChange} autoComplete='off' className="file-input file-input-primary file-input-bordered w-full max-w-xs" required />
          </div>
        <div className="form-control"> 
            <label className="label">
              <span className="label-text">Origin</span>
            </label>
            <input type="input" name="origin" id="origin" onChange={(e) => setAssetOrigin(e?.target.value)} autoComplete='off' placeholder="What is origin of the asset" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="input" name="name" id="name"  onChange={(e) => setAssetName(e?.target.value)} autoComplete='off' placeholder="Enter the name of asset" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Asset Type</span>
            </label>
            <select name="typeId" id="typeId" defaultValue={'100'} onChange={(e) => setAssetType(e?.target.value)} className="select select-bordered w-full max-w-xs">
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

          <button type="submit" disabled={!file || uploading} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" >
                {uploading? "Uploading..." : "Upload"}
            </button>
            
          </div>
        </form>
        <button className='btn btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-lg' onClick={back}>Back</button>
      </div>
    </div>
  </div>
  )
}

export default S3UploadForm