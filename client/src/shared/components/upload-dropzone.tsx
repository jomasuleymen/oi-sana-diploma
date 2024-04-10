import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import { FilePond, registerPlugin } from "react-filepond";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { FilePondOptions, FileStatus } from "filepond";

type FileUploadProps = {
	allowImagePreview?: boolean;
	maxFiles?: number | boolean;
	required?: boolean;
	value?: any;
	avatar?: boolean;
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
	FilePondPluginFileValidateType,
	FilePondPluginImageResize
);

export function UploadDropZone({
	onChange,
	maxFiles,
	allowImagePreview,
	allowMultiple,
	required,
	avatar,
	acceptedFileTypes,
	value,
}: FileUploadProps) {
	const ref = useRef<FilePond | null>(null);
	const additonalOptions = useMemo<FilePondOptions>(() => {
		if (avatar) {
			return {
				labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
				imageCropAspectRatio: "1:1",
				imageResizeTargetWidth: 10,
				imageResizeTargetHeight: 10,
				imagePreviewMaxHeight: 10,
				className: "w-32 h-32 overflow-hidden",
				stylePanelLayout: "compact circle",
				styleLoadIndicatorPosition: "center bottom",
				styleProgressIndicatorPosition: "right bottom",
				styleButtonRemoveItemPosition: "left bottom",
				styleButtonProcessItemPosition: "right bottom",
			};
		}

		return {};
	}, [avatar]);

	const changeState = useCallback(() => {
		const filePond = ref.current;
		if (!filePond) return;

		const fileIds = filePond.getFiles().map((file) => file.serverId);
		const filteredFileIds = fileIds.filter((fileId) => fileId);

		if (allowMultiple) {
			onChange(filteredFileIds.length ? filteredFileIds : null);
		} else {
			onChange(filteredFileIds?.[0] || null);
		}
	}, [ref, allowMultiple]);

	useEffect(() => {
		const filePond = ref.current;
		if (!filePond) return;

		const processingFiles = filePond
		.getFiles()
		.filter((file) => file.status === FileStatus.PROCESSING_QUEUED);
		
		if ((!value || !value.length) && processingFiles.length === 0) {
			filePond.removeFiles();
		}
	}, [value]);

	return (
		<FilePond
			ref={ref}
			allowMultiple={allowMultiple || false}
			maxFiles={maxFiles === true ? null : maxFiles || 1}
			chunkUploads={false}
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
				url: import.meta.env.VITE_SERVER_URL + "/api/upload",
				revert: null,
				fetch: null,
				process: {
					url: "",
					onload: (response: any) => {
						if (response instanceof XMLHttpRequest) {
							response = response.responseText;
						}

						const data: ServerResponse = JSON.parse(response);
						return data.filename;
					},
					withCredentials: true,
				},
			}}
			name="file"
			labelIdle={` Drop items here or <span class="filepond--label-action font-bold">Browse</span>`}
			{...additonalOptions}
		/>
	);
}
