'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const BaseHeaderView  =  ({account, currentName,currentEmail,currentElementId,pageName}:{account: string, currentName: string | undefined,currentEmail: string | undefined,currentElementId: string |undefined, pageName: string|undefined}) => {
const router = useRouter()
 
  return (

<div className='grid grid-cols-4 gap-4'> 
   
    <div className='bg-inherit pt-5 col-span-4 text-center'>
        <h1 className="text-4xl font-bold"></h1>
    </div>
    <div className='bg-inherit col-span-4 text-center'>
        <p className="py-6"><span className='text-2xl font-bold'></span> </p>
    </div>

    <div></div>
    <div> <h5 className="py-6 text-2xl font-semibold">{pageName}</h5></div>
    <div></div>
    <div className='bg-inherit flex justify-center'>
            {/* <button className="btn btn-primary max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs" onClick={() => router.push(`create`)} >
                New Job Opening
            </button> */}
    </div>

    <div className='col-span-4'>
          
    </div>


</div>

  )
}

export default BaseHeaderView