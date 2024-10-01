import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
} from "@files-ui/react";
import * as React from "react";

export default function Upload() {
  const [files, setFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);

  const updateFiles = (incommingFiles) => {
    //do something with the files
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
    //even your own upload implementation
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  return (
    <>
      <Dropzone
        onChange={updateFiles}
        value={files}
        accept="image/*"
        multiple
        headerConfig={{ deleteFiles: false }}
        footerConfig={{ customMessage: "Upload pictures of items to recycle" }}
      >
        {files.map((file) => (
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
