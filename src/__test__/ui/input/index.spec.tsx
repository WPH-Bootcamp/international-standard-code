import Input from '../../..//components/ui/Input';
import { render } from '@testing-library/react';

describe('input component', () => {
  it('render input component', () => {
    const { container } = render(<Input type="text" />);
    expect(container).toMatchSnapshot();
  });
});
