// services/filterApi.ts

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Size {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Color {
  id: number;
  name: string;
  hex_code?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}



// Define your API base URL here
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Generic fetch function with error handling
const apiFetch = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// Category API functions
export const categoryApi = {
  getAll: (): Promise<Category[]> => apiFetch<Category[]>('/products/api/categories/'),
  
  create: async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/products/api/categories/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  getById: (id: number): Promise<Category> => 
    apiFetch<Category>(`/api/categories/${id}/`),
  
  update: async (id: number, categoryData: Partial<Category>): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/products/api/categories/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/api/categories/${id}/`, {
      method: 'DELETE',
      headers: {
        // Add authorization header if needed
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
};

// Size API functions
export const sizeApi = {
  getAll: (): Promise<Size[]> => apiFetch<Size[]>('/products/api/sizes/'),
  
  create: async (sizeData: Omit<Size, 'id'>): Promise<Size> => {
    const response = await fetch(`${API_BASE_URL}/products/api/sizes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sizeData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  getById: (id: number): Promise<Size> => 
    apiFetch<Size>(`/products/api/sizes/${id}/`),
  
  update: async (id: number, sizeData: Partial<Size>): Promise<Size> => {
    const response = await fetch(`${API_BASE_URL}/products/api/sizes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sizeData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/api/sizes/${id}/`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
};

// Color API functions
export const colorApi = {
  getAll: (): Promise<Color[]> => apiFetch<Color[]>('/products/api/colors/'),
  
  create: async (colorData: Omit<Color, 'id'>): Promise<Color> => {
    const response = await fetch(`${API_BASE_URL}/products/api/colors/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colorData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  getById: (id: number): Promise<Color> => 
    apiFetch<Color>(`/api/colors/${id}/`),
  
  update: async (id: number, colorData: Partial<Color>): Promise<Color> => {
    const response = await fetch(`${API_BASE_URL}/products/api/colors/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colorData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/api/colors/${id}/`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
};

// Brand API functions
export const brandApi = {
  getAll: (): Promise<Brand[]> => apiFetch<Brand[]>('/products/api/brands/'),
  
  create: async (brandData: Omit<Brand, 'id'>): Promise<Brand> => {
    const response = await fetch(`${API_BASE_URL}/products/api/brands/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brandData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  getById: (id: number): Promise<Brand> => 
    apiFetch<Brand>(`/products/api/brands/${id}/`),
  
  update: async (id: number, brandData: Partial<Brand>): Promise<Brand> => {
    const response = await fetch(`${API_BASE_URL}/products/api/brands/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brandData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/api/brands/${id}/`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
};

// Tag API functions
export const tagApi = {
  getAll: (): Promise<Tag[]> => apiFetch<Tag[]>('/products/api/tags/'),
  
  create: async (tagData: Omit<Tag, 'id'>): Promise<Tag> => {
    const response = await fetch(`${API_BASE_URL}/products/api/tags/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  getById: (id: number): Promise<Tag> => 
    apiFetch<Tag>(`/products/api/tags/${id}/`),
  
  update: async (id: number, tagData: Partial<Tag>): Promise<Tag> => {
    const response = await fetch(`${API_BASE_URL}/products/api/tags/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/api/tags/${id}/`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
};

// Utility function to fetch all filter options at once
export const fetchAllFilterOptions = async () => {
  try {
    const [categories, sizes, colors, brands] = await Promise.all([
      categoryApi.getAll(),
      sizeApi.getAll(),
      colorApi.getAll(),
      brandApi.getAll()
    ]);

    return {
      categories,
      sizes,
      colors,
      brands
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};