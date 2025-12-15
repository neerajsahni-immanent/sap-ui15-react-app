import React, { useEffect, useState } from 'react';
import { ProfileUpdateForm } from '../models/forms';
import { Input, Button as UI5Button, Card, Form, FormItem, Label, Panel } from '@ui5/webcomponents-react';
import { loadProfile, updateProfile } from '../controllers/profileController';

const ProfileUpdatePage: React.FC = () => {
  const [form, setForm] = useState<ProfileUpdateForm>({ fullName: '', email: '', phone: '', address: '' });
  const [original, setOriginal] = useState<ProfileUpdateForm | null>(null);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await loadProfile();
      setIsLoading(false);
      if (res.success && res.data) {
        const data = res.data;
        const profile: ProfileUpdateForm = { fullName: data.fullName || data.full_name || '', email: data.email || '', phone: data.phone || '', address: data.address || '' };
        setForm(profile);
        setOriginal(profile);
      }
    })();
  }, []);

  const onInput = (field: keyof ProfileUpdateForm) => (e: CustomEvent<{ value: string }>) => {
    setForm(prev => ({ ...prev, [field]: e.detail.value }));
  };

  const hasChanges = () => {
    if (!original) return false;
    return JSON.stringify(original) !== JSON.stringify(form);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setErrors(null);
    setStatusMsg(null);
    const res = await updateProfile(form);
    setIsLoading(false);
    if (!res.success) {
      if (res.errors) setErrors(res.errors);
      if (res.error) setStatusMsg(res.error);
      return;
    }
    setStatusMsg('Profile updated successfully');
    setOriginal(form);
  };

  const onReset = () => {
    if (original) setForm(original);
  };

  return (
    <Panel headerText="Profile">
      <Card>
        <Form style={{ maxWidth: 800 }}>
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
            <Label>Phone</Label>
            <Input name="phone" value={form.phone ?? ''} onInput={onInput('phone')} />
            {errors?.phone && <Label style={{ color: 'var(--sapNegativeColor)' }}>{errors.phone}</Label>}
          </FormItem>

          <FormItem>
            <Label>Address</Label>
            <Input name="address" value={form.address ?? ''} onInput={onInput('address')} />
            {errors?.address && <Label style={{ color: 'var(--sapNegativeColor)' }}>{errors.address}</Label>}
          </FormItem>

          {statusMsg && (
            <FormItem>
              <Label style={{ color: 'var(--sapPositiveColor)' }}>{statusMsg}</Label>
            </FormItem>
          )}

          <FormItem>
            <UI5Button design="Emphasized" onClick={onSubmit} disabled={!hasChanges() || isLoading}>Save Changes</UI5Button>
            <UI5Button onClick={onReset}>Reset</UI5Button>
          </FormItem>
        </Form>
      </Card>
    </Panel>
  );
};

export default ProfileUpdatePage;
