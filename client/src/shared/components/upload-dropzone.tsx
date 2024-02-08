import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { FilePond, registerPlugin } from "react-filepond";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useCallback, useRef } from "react";

type ImageUploadProps = {
	allowImagePreview?: boolean;
	maxFiles?: number;
	required?: boolean;
	acceptedFileTypes?: string[];
} & (
	| {
			onChange: (fileIds: string[] | null) => void;
			allowMultiple: true;
	  }
	| {
			onChange: (fileId: string | null) => void;
			allowMultiple?: false | null | undefined;
	  }
);

interface ServerResponse {
	filename: string;
	path: string;
}

registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType
);

export function UploadDropZone({
	onChange,
	maxFiles,
	allowImagePreview,
	allowMultiple,
	required,
	acceptedFileTypes,
}: ImageUploadProps) {
	const ref = useRef<FilePond | null>(null);

	const changeState = useCallback(() => {
		const filePond = ref.current;
		if (!filePond) return;

		const fileIds = filePond.getFiles().map((file) => file.serverId);
		const filterdFileIds = fileIds.filter((fileId) => fileId);

		if (allowMultiple) {
			onChange(filterdFileIds.length > 0 ? filterdFileIds : null);
		} else {
			onChange(filterdFileIds?.[0] || null);
		}
	}, [ref, allowMultiple]);

	return (
		<div className="App">
			<FilePond
				ref={ref}
				allowMultiple={allowMultiple || false}
				maxFiles={maxFiles || 1}
				chunkUploads={true}
				acceptedFileTypes={acceptedFileTypes || ["*"]}
				allowImagePreview={allowImagePreview}
				required={required}
				credits={false}
				onprocessfiles={() => {
					changeState();
				}}
				onupdatefiles={() => {
					changeState();
				}}
				server={{
					url: import.meta.env.VITE_SERVER_URL,
					revert: null,
					fetch: null,
					process: {
						url: "/api/upload",
						onload: (response: any) => {
							const data: ServerResponse = JSON.parse(response);
							return data.filename;
						},
						withCredentials: true,
					},
				}}
				name="file"
				labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
			/>
		</div>
	);
}
