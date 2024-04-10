import Loading from "@components/loading";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Modal } from "@components/ui/modal";
import {
	deleteCategory,
	fetchCategories,
	MeditationCategory,
} from "@pages/main/meditation/meditation.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";

import React from "react";

type Props = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const ManageMediationCategories: React.FC<Props> = ({ isOpen, setIsOpen }) => {
	const queryClient = useQueryClient();

	const {
		data: categories,
		isLoading: categoryLoading,
		isSuccess: categorySuccess,
	} = useQuery<any, any, MeditationCategory[]>({
		initialData: [],
		queryKey: ["meditation-categories"],
		queryFn: fetchCategories,
	});

	const { mutate } = useMutation<any, any, any>({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["meditation-categories"] });
		},
	});

	const [selectedCategory, setSelectedCategory] = React.useState<MeditationCategory | null>(null);

	const handleDeleteCategory = (id: number) => {
		mutate(id);
	};

	return (
		<Modal
			title="Meditation categories"
			description="Delete meditation categories"
			isOpen={isOpen}
			onClose={() => {
				setIsOpen(false);
			}}
		>
			{categoryLoading && <Loading />}
			{categorySuccess && (
				<div className="flex flex-col gap-2">
					{categories.map((category) => (
						<Card key={category.id} className="p-2 flex items-center justify-between">
							<span>{category.name}</span>

							{selectedCategory && selectedCategory == category ? (
								<div className="flex justify-between gap-2">
									<Button
										variant="destructive"
										onClick={() => {
											handleDeleteCategory(selectedCategory.id);
										}}
									>
										Delete
									</Button>
									<Button
										variant="secondary"
										onClick={() => {
											setSelectedCategory(null);
										}}
									>
										Cancel
									</Button>
								</div>
							) : (
								<Button
									variant="destructive"
									className="px-3"
									onClick={() => {
										setSelectedCategory(category);
									}}
								>
									<TrashIcon size={18} />
								</Button>
							)}
						</Card>
					))}
				</div>
			)}
		</Modal>
	);
};

export default ManageMediationCategories;
