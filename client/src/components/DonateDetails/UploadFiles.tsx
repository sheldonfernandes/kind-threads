import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
} from "@files-ui/react";
import * as React from "react";

type Iprops = {
  handleGetFile : (imageSource: any)=>void
}
export const UploadFiles = (props: Iprops) => {
  const {handleGetFile} =props
  const [files, setFiles] = React.useState<any>([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);

  const updateFiles = async (incommingFiles: any) => {
    setFiles(incommingFiles);
    if (incommingFiles && incommingFiles[0]) {
      handleGetFile(await getImageFile(incommingFiles[0].file))
    }
    
  };

  const getImageFile = (file:any) => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (id: any) => {
    setFiles(files.filter((x: any) => x.id !== id));
  };

  const handleSee = (imageSource: any) => {
    setImageSrc(imageSource);
  };

  return (
    <>
      <Dropzone
        onChange={updateFiles}
        value={files}
        accept="image/*"
        multiple={false}
        maxFiles={1}
        headerConfig={{ deleteFiles: true }}
        footerConfig={{ customMessage: "Upload picture of the item" }}
      >
        {files.map((file: any) => (
          <FileMosaic
            key={file.id}
            {...file}
            onDelete={removeFile}
            preview
            onSee={handleSee}
          />
        ))}
      </Dropzone>
      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>
    </>
  );
}

export default UploadFiles