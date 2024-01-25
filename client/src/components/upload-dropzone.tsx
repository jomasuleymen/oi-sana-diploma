import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onChange?: any;
  files?: ExtFile[];
}

export function FileUpload({ onChange, files = [] }: ImageUploadProps) {
  const onDeleteFile = (fileId: number | string | undefined) => {
    let filteredFiles = files.filter((files) => files.id !== fileId);
    onChange(filteredFiles);
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap py-6 px-2">
        {files.map((file) => (
          <FileMosaic onDelete={onDeleteFile} key={file.id} preview {...file} />
        ))}
      </div>
      <Dropzone
        accept={"image/*"}
        maxFiles={3}
        header={false}
        footer={false}
        className="active:bg-none"
        disableRipple
        uploadConfig={{
          method: "POST",
          autoUpload: true,
          cleanOnUpload: true,
          url: "/api/upload",
        }}
        onUploadFinish={(payload) => {
          console.log("Uploaded", payload);
        }}
        onChange={(files) => {
          onChange(files);
        }}
        value={files}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload />
          <span className="break-words text-wrap relative mt-4 flex w-64 cursor-pointer items-center justify-center text-sm font-semibold leading-6 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500 text-blue-600">
            Choose files or drag and drop
          </span>
          <span className="m-0 h-[1.25rem] text-xs leading-5 text-gray-600">
            Images up to {10}MB, max {3}
          </span>
        </div>
      </Dropzone>
    </>
  );
}
