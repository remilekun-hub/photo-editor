import { ChangeEvent, DragEvent, useRef, useState } from "react";
import "./App.css";

function App() {
	const fileRef = useRef<HTMLInputElement | null>(null);
	const [isDragEnter, setIsDragEnter] = useState<boolean>(false);
	const [file, setFile] = useState("");
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (fileRef.current && e.target.files?.[0]) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files?.[0]);
			reader.onload = (r) => {
				if (typeof r.target?.result === "string") {
					setFile(r.target?.result);
				}
			};
		}
	};

	const handleDragEnter = () => {
		setIsDragEnter(true);
	};
	const handleDragLeave = () => {
		setIsDragEnter(false);
	};
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (r) => {
				if (typeof r.target?.result === "string") {
					setFile(r.target?.result);
				}
			};
		}
	};
	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};
	console.log({ isDragEnter });
	return (
		<>
			<div
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className="mx-auto max-w-[600px] w-full h-[400px] flex justify-center items-center border-[2px] border-dashed rounded-sm"
				// style={{ borderWidth: "1px" }}
			>
				<button onClick={() => fileRef.current?.click()}>
					Upload photo
				</button>
				<input
					type="file"
					className="hidden"
					name=""
					id=""
					ref={fileRef}
					accept="image/*"
					onChange={handleFileChange}
					// onDragOver={handleDrop}
				/>
			</div>
			{file ? (
				<div className="w-full h-[400px]">
					<img
						src={file}
						className="w-full h-full object-contain object-center"
					/>
				</div>
			) : null}
		</>
	);
}

export default App;
