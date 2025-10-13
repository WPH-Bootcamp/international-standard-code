import Button from '../src/components/ui/Button';
import { render } from '@testing-library/react';

describe('button component', () => {
  it('render button component', () => {
    const { container } = render(<Button>button</Button>);
    expect(container).toMatchSnapshot();
  });
});
