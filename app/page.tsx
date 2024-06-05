import Image from "next/image";
import NavBar from "./components/navbar";
import StartPage from "./components/startPage";
import MyReferralList from "./components/referralList";
import BaseHeaderView from "./components/baseHeaderView";
import S3List from "./components/s3List";

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <NavBar
        account={""}
        currentName={undefined}
        currentEmail={undefined}
        currentElementId={undefined}
        isEmployer={undefined}
      ></NavBar>

      <BaseHeaderView
        account={""}
        currentName={""}
        currentEmail={""}
        currentElementId={""}
        pageName={""}
      />

      {/* <MyReferralList id={""!}/> */}
      <S3List></S3List>
    </main>
  );
}
