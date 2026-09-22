import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { loginAtom } from '../store/authAtoms';
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
} from '@chakra-ui/react';

export default function Login() {
  const login = useSetAtom(loginAtom);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login({ email, password });
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      if (typeof result.error === 'string') {
        setError(result.error);
      } else if (result.error?.detail) {
        setError(result.error.detail);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <Container maxW="md" py={16}>
      <Box p={8} bg="white" borderWidth="1px" borderColor="gray.100" borderRadius="lg" shadow="sm">
        <Stack spacing={4} as="form" onSubmit={handleSubmit}>
          
          <Heading as="h1" size="xl" textAlign="center" fontFamily="serif" mb={2}>
            Sign In
          </Heading>

          {error && (
            <Alert.Root status="error" borderRadius="md">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Sign In
          </Button>

          <Text textAlign="center" fontSize="sm" color="gray.600" pt={2}>
            Don't have an account?{' '}
            <Button as={RouterLink} to="/register" variant="link" colorScheme="teal" size="sm">
              Sign up
            </Button>
          </Text>

        </Stack>
      </Box>
    </Container>
  );
}