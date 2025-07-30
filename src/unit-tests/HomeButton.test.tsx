import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomeButton from '../components/Home/HomeButton'

test('renders Find Game HomeButton with correct text and icon', () => {
  render(<HomeButton text="Find Game" faIcon="search" />);
  
  expect(screen.getByText('Find Game')).toBeInTheDocument();
});

test('renders Create Game HomeButton with correct text and icon', () => {
    render(<HomeButton text="Create Game" faIcon="plus" />);
    
    expect(screen.getByText('Create Game')).toBeInTheDocument();
  });

test('renders Options HomeButton with correct text and icon', () => {
render(<HomeButton text="Options" faIcon="gear" />);

expect(screen.getByText('Options')).toBeInTheDocument();
});