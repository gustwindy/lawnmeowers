import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Lawn Meowers Council",
	description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: its safe cause static
					dangerouslySetInnerHTML={{
						__html: `
						(function() {
							function apply(isDark) {
								document.documentElement.classList.toggle('mocha', isDark);
							}
							var mq = window.matchMedia('(prefers-color-scheme: dark)');
							apply(mq.matches);
							mq.addEventListener('change', function(e) { apply(e.matches); });
						})();
					`,
					}}
				/>
			</head>
			<body className="min-h-full flex flex-col bg-ctp-base dark:bg-ctp-crust text-ctp-text">
				<Nav />
				{children}
			</body>
		</html>
	);
}
