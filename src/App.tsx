import "./App.css";
import { ChangeEvent, DragEvent, useRef, useState, useEffect } from "react";
import { clsx } from "clsx";
import { Canvas, Image } from "fabric";

function App() {
	const fileRef = useRef<HTMLInputElement | null>(null);

	const [isDragEnter, setIsDragEnter] = useState<boolean>(false);
	const [imgSrc, setImgSrc] = useState("");

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const fabricCanvasRef = useRef<Canvas | null>(null); // To hold the Fabric.js canvas instance

	useEffect(() => {
		if (canvasRef.current && !fabricCanvasRef.current) {
			// Initialize the Fabric.js canvas if not already initialized
			fabricCanvasRef.current = new Canvas(canvasRef.current, {
				backgroundColor: "#fefefe",
			});
			fabricCanvasRef.current.setDimensions({ width: 1000, height: 1000 });
		}

		return () => {
			// Dispose of the canvas when component unmounts or cleanup happens
			if (fabricCanvasRef.current) {
				fabricCanvasRef.current.dispose();
				fabricCanvasRef.current = null;
			}
		};
	}, []);

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (fileRef.current && e.target.files?.[0]) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = async (r) => {
				if (typeof r.target?.result === "string") {
					// const image = await Image.fromURL(e.target?.result);
					const image = await Image.fromURL(r.target.result);
					image.scale(0.5);
					fabricCanvasRef.current?.add(image);
					fabricCanvasRef.current?.centerObject(image);
					fabricCanvasRef.current?.setActiveObject(image);
					setImgSrc(r.target.result);
					// addImageToCanvas(r.target.result); // Add image to the Fabric canvas
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
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		let file: File | undefined = e.dataTransfer.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (r) => {
				if (typeof r.target?.result === "string") {
					setImgSrc(r.target.result);
					// addImageToCanvas(r.target.result); // Add image to the Fabric canvas
				}
			};
		}
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<>
			<h1>hello world</h1>
			<div
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={clsx(
					"mx-auto max-w-[450px] bg-white cursor-pointer hover:bg-[#F7FAFF] w-full h-[300px] flex justify-center items-center border-2 border-dashed rounded-sm transition-[border-color]",
					{
						"border-green-900": isDragEnter,
						"border-gray-300": !isDragEnter,
					}
				)}
			>
				<button onClick={() => fileRef.current?.click()}>
					Upload photo
				</button>
				<input
					type="file"
					className="hidden"
					ref={fileRef}
					accept="image/*"
					onChange={handleFileChange}
				/>
			</div>

			<div>
				<canvas
					ref={canvasRef}
					// width="1000"
					// height="500"
					className="w-screen h-screen"
				></canvas>{" "}
			</div>
		</>
	);
}

export default App;
