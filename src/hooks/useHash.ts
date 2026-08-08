"use client";
import { useEffect, useState } from "react";

export function useHash() {
	const [hash, setHash] = useState("");

	useEffect(() => {
		setHash(window.location.hash);
		const onHashChange = () => setHash(window.location.hash);
		window.addEventListener("hashchange", onHashChange);

		onHashChange();

		return () => window.removeEventListener("hashchange", onHashChange);
	}, []);

	return hash;
}
