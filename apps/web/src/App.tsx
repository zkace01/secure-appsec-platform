import { useEffect, useState, type FormEvent } from 'react';

type Asset = { id: string; name: string; type: string; hostname: string; description: string | null };
type Vulnerability = { id: string; title: string; severity: string; status: string; assetId: string };
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, { headers: { 'Content-Type': 'application/json' }, ...init });
  if (!response.ok) throw new Error((await response.json() as { error?: string }).error ?? 'Request failed');
  return response.json() as Promise<T>;
}

export function App() {
  const [assets, setAssets] = useState<Asset[]>([]); const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]); const [error, setError] = useState('');
  const load = async () => { try { const [nextAssets, nextVulnerabilities] = await Promise.all([api<Asset[]>('/assets'), api<Vulnerability[]>('/vulnerabilities')]); setAssets(nextAssets); setVulnerabilities(nextVulnerabilities); setError(''); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to load data'); } };
  useEffect(() => { void load(); }, []);
  const createAsset = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const formElement = event.currentTarget; const form = new FormData(formElement); try { await api('/assets', { method: 'POST', body: JSON.stringify({ name: form.get('name'), type: form.get('type'), hostname: form.get('hostname'), description: form.get('description') || undefined }) }); formElement.reset(); await load(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to create asset'); } };
  const createVulnerability = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const formElement = event.currentTarget; const form = new FormData(formElement); try { await api('/vulnerabilities', { method: 'POST', body: JSON.stringify({ title: form.get('title'), description: form.get('description'), severity: form.get('severity'), assetId: form.get('assetId') }) }); formElement.reset(); await load(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to create vulnerability'); } };
  return <main><h1>Secure AppSec Platform</h1><p className="warning">Development-only UI. Authentication and authorization are introduced in Phase 2.</p>{error && <p role="alert">{error}</p>}<section><h2>Assets</h2><form onSubmit={createAsset}><input name="name" placeholder="Name" required maxLength={120}/><input name="type" placeholder="Type" required maxLength={80}/><input name="hostname" placeholder="Hostname" required maxLength={255}/><input name="description" placeholder="Description" maxLength={1000}/><button>Add asset</button></form><ul>{assets.map((asset) => <li key={asset.id}><strong>{asset.name}</strong> — {asset.type} ({asset.hostname})</li>)}</ul></section><section><h2>Vulnerabilities</h2><form onSubmit={createVulnerability}><input name="title" placeholder="Title" required maxLength={160}/><input name="description" placeholder="Description" required maxLength={2000}/><select name="severity" defaultValue="MEDIUM"><option>CRITICAL</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select><select name="assetId" required defaultValue=""><option value="" disabled>Select an asset</option>{assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.name}</option>)}</select><button>Add vulnerability</button></form><ul>{vulnerabilities.map((item) => <li key={item.id}><strong>{item.title}</strong> — {item.severity}, {item.status}</li>)}</ul></section></main>;
}
