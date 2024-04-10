import { useEffect, useState } from "react";

export function useIsVisible(ref: React.RefObject<HTMLElement>) {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		if (!ref.current || isIntersecting) return;

		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting);
		});

		observer.observe(ref.current);
		return () => {
			observer.disconnect();
		};
	}, [ref, isIntersecting]);

	return isIntersecting;
}
