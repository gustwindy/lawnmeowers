"use client";
import { useEffect, useState } from "react";

let patched = false;
function patchHistory() {
	if (patched) return;
	patched = true;
	for (const method of ["pushState", "replaceState"] as const) {
		const original = history[method];
		history[method] = function (...args) {
			original.apply(this, args);
			setTimeout(() => window.dispatchEvent(new Event("locationchange")), 0);
		};
	}
}

export function useHash() {
	const [hash, setHash] = useState("");

	useEffect(() => {
		patchHistory();
		setHash(window.location.hash);

		const update = () => setHash(window.location.hash);
		window.addEventListener("hashchange", update);
		window.addEventListener("popstate", update);
		window.addEventListener("locationchange", update);

		return () => {
			window.removeEventListener("hashchange", update);
			window.removeEventListener("popstate", update);
			window.removeEventListener("locationchange", update);
		};
	}, []);

	return hash;
}
