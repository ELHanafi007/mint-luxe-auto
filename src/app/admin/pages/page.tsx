'use client';

import { useState, useEffect } from 'react';
import { Save, FileText, ChevronRight } from 'lucide-react';

export default function PagesManagement() {
  const [pages, setPages] = useState<any>({});
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages');
      if (res.ok) {
        const data = await res.json();
        setPages(data);
        if (Object.keys(data).length > 0) {
          setSelectedKey(Object.keys(data)[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedKey) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: selectedKey, data: pages[selectedKey] }),
      });
      if (res.ok) {
        alert('Page saved successfully');
      }
    } catch (err) {
      alert('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  const updatePageField = (field: string, value: string) => {
    if (!selectedKey) return;
    setPages({
      ...pages,
      [selectedKey]: {
        ...pages[selectedKey],
        [field]: value
      }
    });
  };

  if (loading) return <div style={{ color: 'rgba(255,255,255,0.4)', padding: '40px', textAlign: 'center' }}>Loading pages...</div>;

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Content Management</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Edit your website's static page content.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '30px',
        minHeight: '600px'
      }}>
        {/* Page List */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: '600', fontSize: '14px' }}>Pages</div>
          <div style={{ flex: 1 }}>
            {Object.keys(pages).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedKey(key)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px 20px',
                  backgroundColor: selectedKey === key ? 'rgba(255,255,255,0.05)' : 'transparent',
                  color: selectedKey === key ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  borderLeft: selectedKey === key ? '3px solid #fff' : '3px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={16} />
                  <span style={{ textTransform: 'capitalize' }}>{key}</span>
                </div>
                <ChevronRight size={14} opacity={selectedKey === key ? 1 : 0.3} />
              </button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {!selectedKey ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>
              Select a page to edit
            </div>
          ) : (
            <>
              <div style={{
                padding: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px' }}>
                  Editing: <span style={{ color: 'rgba(255,255,255,0.5)' }}>{selectedKey}</span>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 20px',
                    backgroundColor: '#fff',
                    color: '#000',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1
                  }}
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Page Title</label>
                  <input
                    type="text"
                    value={pages[selectedKey]?.title || ''}
                    onChange={(e) => updatePageField('title', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#111',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Content (Markdown Supported)</label>
                  <textarea
                    value={pages[selectedKey]?.content || ''}
                    onChange={(e) => updatePageField('content', e.target.value)}
                    style={{
                      flex: 1,
                      width: '100%',
                      padding: '20px',
                      backgroundColor: '#111',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      borderRadius: '6px',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'monospace',
                      minHeight: '400px'
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
