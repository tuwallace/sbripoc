import BaseHeaderView from "../components/baseHeaderView";
import NavBar from "../components/navbar";
import S3UploadForm from "../components/S3UploadForm";
import UserDialog from "../components/userDialog";

export default function AssetObj() {
    return (
      <main className='flex h-screen flex-col'>
          <NavBar account={""} currentName={undefined} 
            currentEmail={undefined} currentElementId={undefined} isEmployer={undefined}></NavBar>
  
  {/* <BaseHeaderView account={""} currentName={""} currentEmail={""} 
            currentElementId={""} pageName={""}/> */}
            
            {/* <UserDialog account={""}/> */}
            <S3UploadForm/>
      </main>
    );
  }