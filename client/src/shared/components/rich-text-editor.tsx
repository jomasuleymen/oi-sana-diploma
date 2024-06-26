import React from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

type Props = {} & ReactQuillProps;

const RichTextEditor: React.FC<Props> = ({ ...props }) => {
	return (
		<ReactQuill
			theme="snow"
			placeholder="Write something..."
			modules={{
				toolbar: [
					["bold", "italic", "underline", "strike"], // toggled buttons
					["blockquote", "code-block"],

					[{ header: 1 }, { header: 2 }], // custom button values
					[{ list: "ordered" }, { list: "bullet" }],
					[{ script: "sub" }, { script: "super" }], // superscript/subscript
					[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
					[{ direction: "rtl" }], // text direction
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					[{ color: [] }, { background: [] }], // dropdown with defaults from theme
					[{ font: [] }],
					[{ align: [] }],

					["clean"], // remove formatting button
				],
			}}
			{...props}
		/>
	);
};

export default RichTextEditor;
