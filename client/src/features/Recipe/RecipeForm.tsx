import {ActionIcon, Box, Button, NumberInput, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {IconSquareX} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export const RecipeForm = () => {
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

    const navigate = useNavigate();

    return (
        <div className="content">
            Please add new recipe

            <Box maw={340} mx="auto">
                <form onSubmit={form.onSubmit(console.log)}>
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
                                 min={0}  {...form.getInputProps('Calories')}
                    />
                    <Button type="submit" mt="md" color="#027926">
                        Submit
                    </Button>
                </form>
            </Box>
            <ActionIcon onClick={() => navigate('/')} className="icon-x" variant="filled" aria-label="Settings"
                        color="#027926">
                <IconSquareX style={{width: '70%', height: '70%'}} stroke={1.5}/>
            </ActionIcon>

        </div>

    )
}