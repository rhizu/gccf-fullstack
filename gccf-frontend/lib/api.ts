import { News, CreateNewsDto, UpdateNewsDto } from '@/types/news';
import { Event, CreateEventDto, UpdateEventDto } from '@/types/events';
import { Gallery, CreateGalleryDto, UpdateGalleryDto } from '@/types/gallery';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const newsApi = {
  getAll: () => fetchApi<News[]>('/news'),
  
  getLatest: (limit?: number) => 
    fetchApi<News[]>(`/news/latest${limit ? `?limit=${limit}` : ''}`),
  
  getByCategory: (category: string) => 
    fetchApi<News[]>(`/news/category/${category}`),
  
  getBySlug: (slug: string) => 
    fetchApi<News>(`/news/slug/${slug}`),
  
  getById: (id: string) => 
    fetchApi<News>(`/news/${id}`),
  
  create: (data: CreateNewsDto) => 
    fetchApi<News>('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: UpdateNewsDto) => 
    fetchApi<News>(`/news/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) => 
    fetchApi<void>(`/news/${id}`, { method: 'DELETE' }),
};

export const eventsApi = {
  getAll: () => fetchApi<Event[]>('/events'),
  
  getCompleted: () => 
    fetchApi<Event[]>('/events/completed'),
  
  getUpcoming: () => 
    fetchApi<Event[]>('/events/upcoming'),
  
  getBySlug: (slug: string) => 
    fetchApi<Event>(`/events/slug/${slug}`),
  
  getById: (id: string) => 
    fetchApi<Event>(`/events/${id}`),
  
  create: (data: CreateEventDto) => 
    fetchApi<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: UpdateEventDto) => 
    fetchApi<Event>(`/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) => 
    fetchApi<void>(`/events/${id}`, { method: 'DELETE' }),
};

export const galleryApi = {
  getAll: () => fetchApi<Gallery[]>('/gallery'),
  
  getVisible: () => 
    fetchApi<Gallery[]>('/gallery/visible'),
  
  getByCategory: (category: string) => 
    fetchApi<Gallery[]>(`/gallery/category/${category}`),
  
  getById: (id: string) => 
    fetchApi<Gallery>(`/gallery/${id}`),
  
  create: (data: CreateGalleryDto) => 
    fetchApi<Gallery>('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: UpdateGalleryDto) => 
    fetchApi<Gallery>(`/gallery/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  reorder: (ids: string[]) => 
    fetchApi<Gallery[]>('/gallery/reorder', {
      method: 'PUT',
      body: JSON.stringify({ ids }),
    }),
  
  delete: (id: string) => 
    fetchApi<void>(`/gallery/${id}`, { method: 'DELETE' }),
};

export const queryKeys = {
  news: {
    all: ['news'] as const,
    lists: () => [...queryKeys.news.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.news.lists(), { filters }] as const,
    details: () => [...queryKeys.news.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.news.details(), slug] as const,
  },
  events: {
    all: ['events'] as const,
    lists: () => [...queryKeys.events.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.events.lists(), { filters }] as const,
    details: () => [...queryKeys.events.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.events.details(), slug] as const,
  },
  gallery: {
    all: ['gallery'] as const,
    lists: () => [...queryKeys.gallery.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.gallery.lists(), { filters }] as const,
    details: () => [...queryKeys.gallery.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.gallery.details(), id] as const,
  },
};