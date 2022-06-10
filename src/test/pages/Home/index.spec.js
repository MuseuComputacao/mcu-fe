import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components'
import Home from '../../../pages/Home/index';

describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});