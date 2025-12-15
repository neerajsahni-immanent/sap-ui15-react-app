import React, { useState } from 'react';
import { RegistrationForm } from '../models/forms';
import { Input, Button as UI5Button, Card, Form, FormItem, Label, Panel } from '@ui5/webcomponents-react';
import { handleRegister } from '../controllers/registrationController';
import { useNavigate } from 'react-router-dom';

const initialForm: RegistrationForm = { fullName: '', email: '', password: '', confirmPassword: '' };

const RegistrationPage: React.FC = () => {
  const [form, setForm] = useState<RegistrationForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const onInput = (field: keyof RegistrationForm) => (e: CustomEvent<{ value: string }>) => {
    setForm(prev => ({ ...prev, [field]: e.detail.value }));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setErrors(null);
    setErrorMsg(null);
    const res = await handleRegister(form);
    setIsLoading(false);
    if (!res.success) {
      if (res.errors) setErrors(res.errors);
      if (res.error) setErrorMsg(res.error);
      return;
    }
    navigate('/login');
  };

  return (
    <Panel headerText="Create Account">
      <Card>
        <Form style={{ maxWidth: 640 }}>
          <FormItem>
            <Label>Full name</Label>
            <Input name="fullName" value={form.fullName} onInput={onInput('fullName')} required />
            {errors?.fullName && <Label style={{ color: 'var(--sapNegativeColor)' }}>{errors.fullName}</Label>}
          </FormItem>

          <FormItem>
            <Label>Email</Label>
            <Input name="email" value={form.email} type="Email" onInput={onInput('email')} required />
            {errors?.email && <Label style={{ color: 'var(--sapNegativeColor)' }}>{errors.email}</Label>}
          </FormItem>

          <FormItem>
            <Label>Password</Label>
            <Input name="password" value={form.password} type="Password" onInput={onInput('password')} required />
            {errors?.password && <Label style={{ color: 'var(--sapNegativeColor)' }}>{errors.password}</Label>}
          </FormItem>

          <FormItem>
            <Label>Confirm password</Label>
            <Input name="confirmPassword" value={form.confirmPassword} type="Password" onInput={onInput('confirmPassword')} required />
            {errors?.confirmPassword && <Label style={{ color: 'var(--sapNegativeColor)' }}>{errors.confirmPassword}</Label>}
          </FormItem>

          {errorMsg && (
            <FormItem>
              <Label style={{ color: 'var(--sapNegativeColor)' }}>{errorMsg}</Label>
            </FormItem>
          )}

          <FormItem>
            <UI5Button design="Emphasized" onClick={onSubmit} disabled={isLoading}>Create Account</UI5Button>
            <UI5Button onClick={() => setForm(initialForm)}>Clear</UI5Button>
          </FormItem>
        </Form>
      </Card>
    </Panel>
  );
};

export default RegistrationPage;
