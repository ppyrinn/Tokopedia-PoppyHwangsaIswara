import { render, screen } from '@testing-library/react';
import App from './app';

test('renders pokemon web', () => {
	render(<App />);
	expect(screen.getByAltText("Pokemon List")).toBeInTheDocument();
	expect(screen.getByAltText("My Pokemon List")).toBeInTheDocument();
});
