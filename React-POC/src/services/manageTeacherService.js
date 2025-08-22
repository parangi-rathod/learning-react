import axios from 'axios';

class ManageTeacherService  {
  constructor() {
    this.baseURL = import.meta.env.VITE_BACKEND_API_URL; 
  }

  async getTeachers() {
    try {
      const response = await axios.get(`${this.baseURL}Admin/teachers`);
      return response.data;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  }
}

export default ManageTeacherService