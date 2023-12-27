import {Box, Button, NumberInput, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

export const RecipeForm = () => {
    const form = useForm({
        initialValues: {
            recipeName: '',
            description: '',
            cookingTime: 0,
            rating: 0,
            comment: '',
        },
        validate: {
            recipeName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            description: (value) => (value.length < 5 ? 'Description must have at least 5 letters' : null),
            cookingTime: (value) => (value < 0 ? 'Cooking time must be a positive number' : null),
            rating: (value) => (value < 0 || value > 5 ? 'Rating must be between 0 and 5' : null),
            comment: (value) => (value.length < 2 ? 'Comment must have at least 10 letters' : null),
        },
    });
    return (
        <div className="content">
            Please add new recipe
            <Box maw={340} mx="auto">
                <form onSubmit={form.onSubmit(console.log)}>
                    <TextInput label="Recipe Name"
                               placeholder="Enter recipe name" {...form.getInputProps('recipeName')} />
                    <Textarea
                        mt="sm"
                        label="Description"
                        placeholder="Enter recipe description"
                        {...form.getInputProps('description')}
                    />
                    <NumberInput
                        mt="sm"
                        label="Cooking Time (minutes)"
                        placeholder="Enter cooking time"
                        min={0}
                        {...form.getInputProps('cookingTime')}
                    />
                    <NumberInput
                        mt="sm"
                        label="Rating"
                        placeholder="Enter rating (0-5)"
                        min={0}
                        max={5}
                        {...form.getInputProps('rating')}
                    />
                    <Textarea
                        mt="sm"
                        label="Comment"
                        placeholder="Enter your comment"
                        {...form.getInputProps('comment')}
                    />
                    <Button type="submit" mt="sm">
                        Submit
                    </Button>
                </form>
            </Box>
        </div>

    )
}