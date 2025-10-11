import Input from '../../../components/ui/Input';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'text',
      description: 'Type of input (text, password, email, etc.)',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown when the input is empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
    },
    value: {
      control: 'text',
      description: 'Current text value inside the input',
    },
    onChange: {
      action: 'changed',
      description: 'Event fired when the input value changes',
    },
  },
};

export const Default = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

export const Password = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Disabled = {
  args: {
    type: 'text',
    placeholder: 'Disabled input',
    disabled: true,
  },
};
