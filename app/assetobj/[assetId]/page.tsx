import AssetEdit from "@/app/components/assetEdit";
import NavBar from "@/app/components/navbar";




export default function AssetEditObj({params} : {params:{assetId: string}}) {

  let assetId = decodeURIComponent(params.assetId)
    return (
      <main className='flex h-screen flex-col'>
          <NavBar account={""} currentName={undefined} 
            currentEmail={undefined} currentElementId={undefined} isEmployer={undefined}></NavBar>
  
  {/* <BaseHeaderView account={""} currentName={""} currentEmail={""} 
            currentElementId={""} pageName={""}/> */}
            
            <AssetEdit assetId={assetId} />
      </main>
    );
  }