'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, Mail, Phone, Share2 } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert('Settings updated successfully');
      }
    } catch (err) {
      alert('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const updateSocial = (field: string, value: string) => {
    setSettings({
      ...settings,
      social: { ...settings.social, [field]: value }
    });
  };

  if (loading) return <div style={{ color: 'rgba(255,255,255,0.4)', padding: '40px', textAlign: 'center' }}>Loading settings...</div>;

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Site Settings</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Configure global website information and contact details.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* Basic Info */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
            <Globe size={18} color="rgba(255,255,255,0.5)" />
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>General Information</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Site Title</label>
              <input
                type="text"
                value={settings.siteTitle || ''}
                onChange={(e) => updateSetting('siteTitle', e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Meta Description</label>
              <textarea
                value={settings.metaDescription || ''}
                onChange={(e) => updateSetting('metaDescription', e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', resize: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
            <Mail size={18} color="rgba(255,255,255,0.5)" />
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Contact Details</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail || ''}
                onChange={(e) => updateSetting('contactEmail', e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Phone Number</label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => updateSetting('phone', e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
            <Share2 size={18} color="rgba(255,255,255,0.5)" />
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Social Media</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Instagram URL</label>
              <input
                type="text"
                value={settings.social?.instagram || ''}
                onChange={(e) => updateSocial('instagram', e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>LinkedIn URL</label>
              <input
                type="text"
                value={settings.social?.linkedin || ''}
                onChange={(e) => updateSocial('linkedin', e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 30px',
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              fontSize: '14px',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1
            }}
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
