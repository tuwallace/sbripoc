"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function S3List() {
  const router = useRouter();
  interface S3Asset {
    Key: string;
    LastModified: string;
    ETag: string;
    Size: number;
    StorageClass: string;
  }
  const [list, setList] = useState<S3Asset[]>();

  useEffect(() => {
    const fetchData = async () => {
      let currentDomain = window.location.origin;
      const response = await fetch(`${currentDomain}/api/s3GetObjects`, {
        method: "GET",
      });
      const data = await response.json();
      // console.log("results =>", response.status);
      return data;
    };
    fetchData()
      .then((x) => {
        let l: S3Asset[] = [];
        x.result.map((h: S3Asset) => {
          l.push(h);
        });
        setList(l);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="col-span-4 bg-base-200">
      <div className="bg-inherit">
        <button
          className="btn btn-primary max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs"
          onClick={() => router.push(`/assetobj`)}
        >
          Create New Asset
        </button>
      </div>

      <div className="col-span-4 bg-base-200 -z-10">
        {/* Start skill list*/}
        <div className="col-span-4 bg-base-200">
          <div className="overflow-x-auto">
            <table className="table lg:table-md md:table-md sm:table-sm xs:table-xs">
              <thead>
                <tr>
                  <th className="font-bold">
                    Key {process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}
                  </th>
                  <th>Last Modifed</th>
                  <th>ETag</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list?.map((x, i) => {
                  function viewCoalesce(x: S3Asset) {
                    throw new Error("Function not implemented.");
                  }

                  function viewAllReferrals(x: S3Asset) {
                    throw new Error("Function not implemented.");
                  }

                  return (
                    <tr key={x.ETag} className="hover">
                      <td>{x.Key}</td>
                      <td>{x.LastModified}</td>
                      <td>{x.ETag}</td>
                      <td>{x.Size}</td>
                      <td>
                        {/* <button
                          title="Edit Asset"
                          className="btn   btn-link max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs"
                          onClick={() => router.push(`/assetobj/${x.Key}`)}
                        >
                          Edit
                        </button>

                        <button
                          title="View Asset"
                          className="btn btn-link max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs"
                          onClick={() => {
                            viewCoalesce(x);
                          }}
                        >
                          View
                        </button>

                        <button
                          title="Asset History"
                          className="btn   btn-link max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs"
                          onClick={() =>
                            router.push(`/assetobj/history/${x.Key}`)
                          }
                        >
                          History
                        </button>

                        <button
                          title="View Asset Media"
                          className="btn btn-link max-w-sm sm:btn-sm md:btn-md lg:btn-md xs:btn-xs"
                          onClick={() => {
                            viewAllReferrals(x);
                          }}
                        >
                          Media
                        </button> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/*End Skill List */}
      </div>
    </div>
  );
}

export default S3List;
