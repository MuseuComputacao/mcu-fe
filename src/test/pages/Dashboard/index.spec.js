import React from 'react';
import renderer from 'react-test-renderer';

import Dashboard from '../../../pages/Dashboard/index';

describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});