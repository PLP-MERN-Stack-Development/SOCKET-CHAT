import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const AuthForm = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(...Object.values(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <Input
          key={field.name}
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          required={field.required}
          className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/70"
        />
      ))}
      <Button 
        type="submit"
        className="w-full bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-200"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default AuthForm;
