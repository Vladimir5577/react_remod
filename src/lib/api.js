const BASE_URL = import.meta.env.VITE_API_URL || '';

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export const api = {
  getCases: () => get('/api/cases'),
  getCase: (slug) => get(`/api/cases/${slug}`),
  getHero: () => get('/api/hero'),
  getTestimonials: () => get('/api/testimonials'),
  getPackages: () => get('/api/packages'),
  getFaqs: () => get('/api/faqs'),
  getContacts: () => get('/api/contacts'),
  submitLead: (data) =>
    fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
};
