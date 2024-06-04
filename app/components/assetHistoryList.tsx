'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import BasicPersonType from './interfaces/basicPersonType';
import { getAll, GetAssetHistory, getLocation } from '../actions';
import AssetEdit from './assetEdit';




const AssetHistoryList = ({id}:{id:string}) => {
    

      const router = useRouter()
      const[list,setList] = useState<BasicPersonType[]>([])
      const[rList,setRList] = useState<BasicPersonType[]>([])
      const[showSearchResult,setShowSearchResult] = useState<boolean>(false)
      const[showReferalResult,setShowReferalResult] = useState<boolean>(false)
      const[currentSelection,setCurrentSelection] =useState<string>("")
      const [showDRDialog,setShowDRDialog] = useState<boolean>(false)
      const[currentAsset,setCurrentAsset] = useState<BasicPersonType>()

      const [open, setOpen] = useState(false);
      const handleToggle = () => setShowDRDialog((prev) => !prev);

      const[value,setValue] = useState("")
      const[positionId, setPositionId] = useState<string>("")
    
      const [items, setItems] = React.useState<Job[]>([]);
      const[show,setShow]=useState(false)
      const ref = useRef<HTMLInputElement>(null)
    
      type Job = {
        name: string;
        elementId: string;
      };

      interface AssetList {
        Key: string
        Record:BasicPersonType
      }
      interface AssetHistory {
        results:AssetList[]
        fetchedRecordsCount:number,
        bookmark:string
      }
      interface AssetLocation {
        assetID: string
        originId: string
        created: string
        typeId: string 
        origin: string
        name: string,
        location: string 
        originalname: string,
        mineType: string,
        url: string
      }
      const[currentAssetLoc,setCurrentAssetLoc] = useState<AssetLocation>()

      useEffect(() => {
          const fetchData = async (elementId:string) =>{
          const queryText ={
            checkSum: elementId
          }
           const rc = await GetAssetHistory(JSON.stringify(queryText),undefined!)
            return rc
          }
            fetchData(id).then((x)=>{
            
             let r:AssetHistory = JSON.parse(x)
             let myList:BasicPersonType[] = []

             console.log(r.results)
             r.results.map((v,i)=>{
                myList.push(v.Record)
             })

            setList(myList)
             
          
          }).catch(console.error)

      },[])
      
    
    
    const backToJobList =async () => {
      setList([])
      // const rc =  await getMyMintedResumeList(id)
      // setList(rc)
      setShowSearchResult(false)
      setShowReferalResult(false)
    }

    const manageReferral= async (x: BasicPersonType) => {
     
    }

    const directReferral = async (x: BasicPersonType)  =>{
      
    }
    const preScreening = async  (x: BasicPersonType) => {
     
    }

    const viewReferral = async (x:BasicPersonType) => {
     
    }

    const viewExternalReferral = async (x:BasicPersonType) => {
      
    }

    const viewResume = async(x:BasicPersonType)=>{
      setCurrentAsset(x)
      setShowSearchResult(true)
      setList([])
    }

    const viewCoalesce = async(x:BasicPersonType)=>{
          const rc = await getLocation(x.assetID)
          var loc:AssetLocation = JSON.parse(rc)
          setCurrentAssetLoc(loc)
          setShowDRDialog(true)
    }

    const viewAllReferrals = async(x:BasicPersonType)=>{
      window.open(`http://localhost:3000/asset/view/location/${x.assetID}`, '_blank', 'noopener,noreferrer');
    }
  
  
    const onSelectionChange = (key:string,name:string) => {
      setValue(name)
      setPositionId(key)
    };
  
    const onInputChange = async (prefix: string) => {
      
      if(prefix.length >= 3){
      
        // let rc = await getTypeAheadPerson(prefix)
        //     let r: any = undefined
        //     let skills:Job[]=[]
        //   rc?.map((x) =>{
        //     r = x
        //     skills.push(...[{elementId: r[3],name: r[0]}])
          
        //   })
          //console.log(skills)
          setItems([])
          setShow(true)
    
        }else if(prefix.length === 0 ){
          setItems([])
          setShow(false)
        }
       
    };
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



    
  return (
    <div className='col-span-4 bg-base-200'>


  
        <div className='col-span-4 bg-base-200 -z-10'>
             {/* Start skill list*/}
             <div className='col-span-4 bg-base-200'>
                <div className="overflow-x-auto">
                  {!showSearchResult && (
                      <table className="table lg:table-md md:table-md sm:table-sm xs:table-xs">
                      <thead>
                        <tr>
                          <th>Created</th>
                          <th>Origin</th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map( (x,i) => {
                          
                          return (
                            <tr key={x.assetID} className='hover'>
                              <td>{x.created}</td>
                              <td>{x.origin}</td>
                              <td>{x.name}</td>
                              <td>{translateAssetType(x.typeId)}</td>
                              <td>
                              
                                  {/* <button title="Edit Asset" className="btn   btn-link max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs" onClick={() => router.push(`/assetobj/${x.assetID}`)} >Edit</button> */}

                                  <button title="View Asset" className="btn btn-link max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs" onClick={()=> {viewCoalesce(x)}}>View</button>
                                  <button title="View Asset Media" className="btn btn-link max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs" onClick={()=> {viewAllReferrals(x)}}>Media</button>
                              </td>
                            </tr>
                            )
                          })}
                      </tbody>
                      </table>
                  )}

             

                  
                </div>
              </div>
        {/*End Skill List */}
        </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open={showDRDialog} onClose={handleToggle}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">View Asset Location</h3>
          <div className='form-control pt-3 px-4 dropdown'>
               <div><span className='font-semibold'>Orign</span>: {currentAssetLoc?.origin}</div>
               <div><span className='font-semibold'>Name</span>: {currentAssetLoc?.name}</div>
               <div><span className='font-semibold'>Asset Type</span>: {translateAssetType(currentAssetLoc?.typeId!)}</div>
         
               <div className="divider divider-primary">Location Details</div>

               <div><span className='font-semibold'>Encrypted Location</span>: 
                        <p className=' text-ellipsis overflow-hidden'>{currentAssetLoc?.location}</p>
               </div> 
               <div><span className='font-semibold'>File</span>: {currentAssetLoc?.originalname}</div>
               <div><span className='font-semibold'>Mime Type</span>: {currentAssetLoc?.mineType}</div>
             </div>
           
          <div className="modal-action">
            <form method="dialog">         
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs">Close</button>
            </form>
          </div>
        </div>
      </dialog>
   </div>
  )
} 

export default AssetHistoryList