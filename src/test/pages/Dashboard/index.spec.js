import React from 'react';
import renderer from 'react-test-renderer';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'jest-styled-components'
import Dashboard from '../../../pages/Dashboard/index';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('<Dashboard />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});