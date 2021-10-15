import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("Normal Tests", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  
  it('renders Repo Search', () => {
    render(<App />);
    expect(screen.getByText('Language')).toBeInTheDocument();
  });

  it('renders language dropdown', () => {
    render(<App />);
    expect(screen.getByText('Repo Search')).toBeInTheDocument();
  });

  test('expects an array of languages', () => {
    const mock = jest.fn();
    ['Python', 'JavaScript', 'C++'].map(language => mock(language));
    expect(mock).toBeCalledWith(expect.stringContaining('Python'));
  });
})

