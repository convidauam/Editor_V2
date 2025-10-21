const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6543';

export interface HoneycombItem {
  id: string;
  title: string;
  icon?: string;
  url?: string;
}

export interface NodeData {
  id: string;
  label: string;
  contents?: string;
  url: string;
  iconUrl?: string;
  nodes: any[];
  edges: any[];
}

export const honeycombApi = {
  async getHoneycombs(): Promise<{ honeycombs: HoneycombItem[] }> {
    try {
      const url = `${API_BASE_URL}/api/v1/honeycombs`;
      console.log('Fetching honeycombs from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const text = await response.text();
        console.error('Response error:', text);
        throw new Error(`Failed to fetch honeycombs: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Honeycombs data received:', data);
      return data;
    } catch (error) {
      console.error('Error in getHoneycombs:', error);
      throw error;
    }
  },

  async getHoneycomb(name: string) {
    try {
      const url = `${API_BASE_URL}/api/v1/honeycombs/${name}`;
      console.log('Fetching honeycomb:', name, 'from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch honeycomb: ${name}`);
      }
      
      const data = await response.json();
      console.log('Honeycomb data received:', data);
      return data;
    } catch (error) {
      console.error('Error in getHoneycomb:', error);
      throw error;
    }
  },

  async getNode(nodeId: string): Promise<NodeData> {
    try {
      const url = `${API_BASE_URL}/api/v1/node/${nodeId}`;
      console.log('Fetching node:', nodeId, 'from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch node: ${nodeId}`);
      }
      
      const data = await response.json();
      console.log('Node data received:', data);
      return data;
    } catch (error) {
      console.error('Error in getNode:', error);
      throw error;
    }
  }
};
