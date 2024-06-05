
import { getAsset } from "@/app/actions";
import AssetHistoryList from "@/app/components/assetHistoryList";
import BaseHeaderView from "@/app/components/baseHeaderView";
import BasicPersonType from "@/app/components/interfaces/basicPersonType";
import NavBar from "@/app/components/navbar";



export default async function AssetHistory({params} : {params:{assetId: string}}) {

  let assetId = decodeURIComponent(params.assetId)
  const rc:BasicPersonType = await getAsset(assetId).then((x) =>{
          let s:BasicPersonType = JSON.parse(x)
           return s
  })
  //console.log(`getting asset history for => `,rc.assetID, rc.checkSum)
 
  

    return (
      <main className='flex h-screen flex-col'>
          <NavBar account={""} currentName={undefined} 
            currentEmail={undefined} currentElementId={undefined} isEmployer={undefined}></NavBar>
  
  <BaseHeaderView account={""} currentName={""} currentEmail={""} 
            currentElementId={""} pageName={"Asset History"}/>
            
            <AssetHistoryList id={rc.checkSum}/>
      </main>
    );
  }