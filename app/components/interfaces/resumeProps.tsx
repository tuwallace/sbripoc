import BasicPersonType from "./basicPersonType"


interface EditAssetProps  {
  
    backToList: () => void
    translateType:(typeId:string) => string
    asset:BasicPersonType
  
}

export default EditAssetProps