import React, { useState } from 'react';
import { LoginForm } from '../models/forms';
import { Input, Button as UI5Button, Card, Form, FormItem, Label, Panel } from '@ui5/webcomponents-react';
import { handleLogin } from '../controllers/loginController';
import { useNavigate } from 'react-router-dom';

const initialForm: LoginForm = { email: '', password: '' };

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const onEmailInput = (e: CustomEvent<{ value: string }>) => {
    setForm(prev => ({ ...prev, email: e.detail.value }));
  };

  const onPasswordInput = (e: CustomEvent<{ value: string }>) => {
    setForm(prev => ({ ...prev, password: e.detail.value }));
  };

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    setErrors(null);
    setErrorMsg(null);
    const res = await handleLogin(form);
    setIsLoading(false);
    if (!res.success) {
      if (res.errors) setErrors(res.errors);
      if (res.error) setErrorMsg(res.error);
      return;
    }
    navigate('/profile');
  };

  return (
    <Panel headerText="Sign In" >
      <Card>
        <Form style={{ maxWidth: 560 }}>
          <FormItem>
            <Label> Email </Label>
            <Input name="email" value={form.email} type="Email" placeholder="you@example.com" onInput={onEmailInput} required />
            {errors?.email && <Label style={{ color: 'var(--sapNegativeColor)' }}>{errors.email}</Label>}
          </FormItem>

          <FormItem>
            <Label> Password </Label>
            <Input name="password" value={form.password} type="Password" onInput={onPasswordInput} required />
            {errors?.password && <Label style={{ color: 'var(--sapNegativeColor)' }}>{errors.password}</Label>}
          </FormItem>

          {errorMsg && (
            <FormItem>
              <Label style={{ color: 'var(--sapNegativeColor)' }}>{errorMsg}</Label>
            </FormItem>
          )}

          <FormItem>
            <UI5Button design="Emphasized" onClick={() => onSubmit(undefined)} disabled={isLoading}>Sign In</UI5Button>
            <UI5Button onClick={() => setForm(initialForm)}>Clear</UI5Button>
          </FormItem>
        </Form>
      </Card>
    </Panel>
  );
};

export default LoginPage;
