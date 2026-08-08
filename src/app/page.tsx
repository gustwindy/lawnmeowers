import Image from "next/image";

export default function About() {
	return (
		<section id="about" className="flex flex-col items-center justify-center">
			<Image src="/cail.png" alt="logo" width={256} height={256} />
			<h1 className="text-4xl">Lawn Meowers Council</h1>
			<p className="text-2xl">meowing commeownity :3</p>
		</section>
	);
}
