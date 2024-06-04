'use server'

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";


export async function getAll() {

    const requestOptions: any = {
        method: "GET",
        redirect: "follow"
      };
      let rc: any
      rc = await fetch("http://localhost:3000", requestOptions)
        .then((response) => response.text())
        .then((result) => {
           //console.log(result) 
            return result
        })
        .catch((error) => console.error(error));

        revalidatePath('/')
        return rc
}

export async function createAsset(formData: FormData) {
      let rc: any = {}
    //   const formdata = new FormData();
    //   formdata.append("file", fileInput.files[0], "pim0518y.pdf");
    //   formdata.append("origin", "Taft MacBook Pro");
    let created: Date = new Date()
    formData.append('assetID', randomUUID())
    formData.append('originId', randomUUID())
    formData.append('created',created.toDateString())
    formData.append('checkSum',randomUUID())
      
      const requestOptions: any= {
        method: "POST",
        body: formData,
        redirect: "follow"
      };

      
      
      rc = await fetch("http://localhost:3000/sample/put/data", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            return result
        })
        .catch((error) => console.error(error));

      revalidatePath('/')
      return rc
}

export async function editAsset(formData: FormData) {
  let rc: any = {}
  let created: Date = new Date()
  formData.append('assetID', randomUUID())
  formData.append('originId', randomUUID())
  formData.append('created',created.toDateString())
    
    const requestOptions: any= {
      method: "POST",
      body: formData,
      redirect: "follow"
    };

    
    
    rc = await fetch("http://localhost:3000/sample/put/data", requestOptions)
      .then((response) => response.text())
      .then((result) => {
          return result
      })
      .catch((error) => console.error(error));

    revalidatePath('/')
    return rc
}

export async function getAsset(params:string) {
    const requestOptions:any = {
        method: "GET",
        redirect: "follow"
      };
      let rc: any
      rc = await fetch(`http://localhost:3000/asset/${params}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            //console.log('getAsset =>',result)
            return result
        })
        .catch((error) => console.error(error));

        revalidatePath('/')
        return rc
}

export async function GetAssetPages(query:string,bookmark:string) {
  const myHeaders = new Headers();

  myHeaders.append("queryText", JSON.stringify(query));
  if(bookmark !== undefined){
    myHeaders.append("bookmark", bookmark);
  }
  
const requestOptions:any = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

let rc: any
  rc = await fetch("http://localhost:3000/asset/fields/query", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result)
    return result
  })
  .catch((error) => console.error(error));


  revalidatePath('/')
  return rc

}


export async function GetAssetHistory(query:string,bookmark:string) {
  const myHeaders = new Headers();

  console.log(query,bookmark)
  myHeaders.append("queryText", query);
  if(bookmark !== undefined){
    myHeaders.append("bookmark", bookmark);
  }
  
const requestOptions:any = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

let rc: any
  rc = await fetch("http://localhost:3000/asset/fields/query/history", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    //console.log(result)
    return result
  })
  .catch((error) => console.error(error));


  revalidatePath('/')
  return rc

}

export async function getLocation(assetId:string) {
  const requestOptions:any = {
    method: "GET",
    redirect: "follow"
  };
  let rc: any
  rc = await fetch(`http://localhost:3000/asset/location/${assetId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
       
        return result
    })
    .catch((error) => console.error(error));

    revalidatePath('/')
    return rc
}


export async function getLocationView(assetId:string) {
  const requestOptions:any = {
    method: "GET",
    redirect: "follow"
  };
  let rc: any
  rc = await fetch(`http://localhost:3000/asset/view/location/${assetId}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
       
        return result
    })
    .catch((error) => console.error(error));

    revalidatePath('/')
    return rc
}

