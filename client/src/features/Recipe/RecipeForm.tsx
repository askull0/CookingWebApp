import {Box, Button, Modal, NumberInput, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {useState} from "react";

interface Recipe {
    name: string;
    description: string;
    totalTime: number;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    rating?: number;
    reviews?: number;
}

export const RecipeForm = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            recipeName: '',
            description: '',
            cookingTime: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
            calories: 0,
        },
        validate: {
            recipeName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            description: (value) => (value.length < 5 ? 'Description must have at least 5 letters' : null),
            cookingTime: (value) => (value < 0 ? 'Cooking time must be a positive number' : null),
            fat: (value) => (value < 0 ? 'Cooking time must be a positive number' : null),
            carbs: (value) => (value < 0 ? 'Must be a positive number' : null),
            protein: (value) => (value < 0 ? 'Must be a positive number' : null),
            calories: (value) => (value < 0 ? 'Must be a positive number' : null),
        },
    });

    const handleSubmit = async () => {
        try {
            const response: AxiosResponse<Recipe> = await axios.post('/recipes', {
                "name": form.values.recipeName,
                "description": form.values.description,
                "totalTime": form.values.cookingTime,
                "calories": form.values.calories,
                "fat": form.values.fat,
                "carbs": form.values.carbs,
                "protein": form.values.protein,
            });
            const {rating, reviews, ...rest} = response.data;
            setRecipes([...recipes, response.data]);
            setSelectedRecipe(response.data);
            setModalOpen(true);
        } catch (error) {
            console.error(error);
        }
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedRecipe(null);
        navigate("/");
    };

    return (
        <div className="content">
            Please add new recipe

            <Box maw={340} mx="auto">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    form.onSubmit(handleSubmit)();
                }}>
                    <TextInput mt="sm" label="Recipe Name"
                               placeholder="Enter recipe name" {...form.getInputProps('recipeName')} />
                    <Textarea mt="sm" label="Description"
                              placeholder="Enter recipe description"
                              {...form.getInputProps('description')}
                    />
                    <NumberInput mt="sm" label="Cooking Time (minutes)"
                                 min={0}  {...form.getInputProps('cookingTime')}
                    />
                    <Box mt="sm" style={{display: 'flex', gap: '8px'}}>
                        <NumberInput label="Fat" min={0} {...form.getInputProps('fat')} />
                        <NumberInput label="Carbs" min={0} {...form.getInputProps('carbs')} />
                        <NumberInput label="Protein" min={0} {...form.getInputProps('protein')} />
                    </Box>
                    <NumberInput mt="sm" label="Calories"
                                 min={0}  {...form.getInputProps('calories')}
                    />
                    <Button type="submit" mt="md" color="#027926">
                        Submit
                    </Button>
                </form>
            </Box>
            <Modal
                title="New recipe added!!"
                opened={modalOpen}
                onClose={closeModal}
                size="md"
            >
                {selectedRecipe && (
                    <div className="content">
                        <div>Name: {selectedRecipe.name}</div>
                        <div>Description: {selectedRecipe.description}</div>
                        <div>Total Time: {selectedRecipe.totalTime} minutes</div>
                        <div>Calories: {selectedRecipe.calories}</div>
                        <div>Fat: {selectedRecipe.fat}</div>
                        <div>Carbs: {selectedRecipe.carbs}</div>
                        <div>Protein: {selectedRecipe.protein}</div>
                        <div>Rating: {selectedRecipe.rating}</div>
                        <div>Reviews: {selectedRecipe.reviews}</div>
                    </div>
                )}
            </Modal>
        </div>

    )
}