import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Typography, TextField, Button, Box, Card, CardContent } from '@mui/material';
import { backend } from 'declarations/backend';

type FormInput = {
  item: string;
};

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<FormInput>();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const result = await backend.getItems();
    if (result) {
      setItems(result);
    }
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    try {
      const result = await backend.addItem(data.item);
      if ('ok' in result) {
        await fetchItems();
        reset();
      } else {
        console.error('Error adding item:', result.err);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Simple Dapp
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('item')}
            label="New Item"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Item'}
          </Button>
        </form>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Stored Items:
          </Typography>
          {items.map((item, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">{item}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default App;
