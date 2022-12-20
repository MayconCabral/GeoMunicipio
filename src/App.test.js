import { render, screen } from '@testing-library/react';
import App from './App';

test('Testa o loading da página', () => {
  const {container} = render(<App />);
  const loading = container.getElementsByClassName('loading__home');

  expect(loading.length).toBe(1)
});
