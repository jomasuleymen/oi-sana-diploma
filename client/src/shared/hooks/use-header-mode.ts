import { HeaderMode, useHeaderStore } from "@/store/header-mode.store";
import { useEffect, useState } from "react";

export const useHeaderMode = (defaultMode: HeaderMode = "normal", yScroll?: number) => {
	const [mode, setMode] = useState<HeaderMode>(defaultMode);
	const setHeaderClassName = useHeaderStore((store) => store.addClassName);

	useEffect(() => {
		setHeaderClassName(mode);

		if (yScroll) {
			const handleScroll = () => {
				if (window.scrollY < yScroll) {
					setHeaderClassName(mode);
				} else {
					setHeaderClassName("normal");
				}
			};

			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
				setHeaderClassName("normal");
			};
		}

		return () => {
			setHeaderClassName("normal");
		};
	}, [mode, setMode, yScroll]);

	return [mode, setMode];
};
