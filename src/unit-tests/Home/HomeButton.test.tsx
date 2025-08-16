import '@testing-library/jest-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '@testing-library/react';
import HomeButton from '../../components/Home/HomeButton';

test('renders Find Game HomeButton with correct text and icon', () => {
  render(
    <HomeButton text='Find Game' faIcon={faSearch} dataId='find-game-btn' />
  );

  expect(screen.getByText('Find Game')).toBeInTheDocument();
});

test('renders Create Game HomeButton with correct text and icon', () => {
  render(
    <HomeButton text='Create Game' faIcon={faPlus} dataId='create-game-btn' />
  );

  expect(screen.getByText('Create Game')).toBeInTheDocument();
});

test('renders Options HomeButton with correct text and icon', () => {
  render(<HomeButton text='Options' faIcon={faGear} dataId='options' />);

  expect(screen.getByText('Options')).toBeInTheDocument();
});
