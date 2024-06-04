import BaseHeaderView from "../components/baseHeaderView";
import NavBar from "../components/navbar";
import UserDialog from "../components/userDialog";

export default function AssetObj() {
    return (
      <main className='flex h-screen flex-col'>
          <NavBar account={""} currentName={undefined} 
            currentEmail={undefined} currentElementId={undefined} isEmployer={undefined}></NavBar>
  
  {/* <BaseHeaderView account={""} currentName={""} currentEmail={""} 
            currentElementId={""} pageName={""}/> */}
            
            <UserDialog account={""}/>
      </main>
    );
  }