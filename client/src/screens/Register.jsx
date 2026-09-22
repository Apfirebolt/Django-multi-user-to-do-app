import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { registerAtom } from '../store/authAtoms';
import { useNavigate, Link as RouterLink } from 'react-router';
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
  Text,
  Alert,
  HStack,
} from '@chakra-ui/react';

export default function Register() {
  const register = useSetAtom(registerAtom);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await register(formData);
    setIsLoading(false);

    if (result.success) {
      // Redirect to login page on successful registration
      navigate('/login');
    } else {
      // Parse error response from backend safely
      if (typeof result.error === 'string') {
        setError(result.error);
      } else {
        // Handle Django object errors (e.g., { email: ["user with this email already exists."] })
        const errorMessages = Object.entries(result.error)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join(' | ');
        setError(errorMessages || 'Registration failed. Please check your inputs.');
      }
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Box p={8} bg="white" borderWidth="1px" borderColor="gray.100" borderRadius="lg" shadow="sm">
        <Stack spacing={4} as="form" onSubmit={handleSubmit}>
          
          <Heading as="h1" size="xl" textAlign="center" fontFamily="serif" mb={2}>
            Create an Account
          </Heading>

          {error && (
            <Alert.Root status="error" borderRadius="md" fontSize="sm">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>{error}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}

          <Field.Root required>
            <Field.Label>Email Address</Field.Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
            />
          </Field.Root>

          <HStack spacing={4}>
            <Field.Root>
              <Field.Label>First Name</Field.Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Last Name</Field.Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </Field.Root>
          </HStack>

          <Field.Root required>
            <Field.Label>Password (min. 8 characters)</Field.Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </Field.Root>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            mt={4}
            loading={isLoading}
          >
            Sign Up
          </Button>

          <Text textAlign="center" fontSize="sm" color="gray.600" pt={2}>
            Already have an account?{' '}
            <Button as={RouterLink} to="/login" variant="link" colorScheme="teal" size="sm">
              Sign in
            </Button>
          </Text>

        </Stack>
      </Box>
    </Container>
  );
}