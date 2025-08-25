import axios from 'axios';

class ManageTeacherService  {
  constructor() {
    this.baseURL = "https://localhost:7154/api/"; 
  }

  async getTeachers() {
    try {
      const response = await axios.get(`${this.baseURL}Admin/GetTeachers`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  }

  async AddTeachers(teacherDTO) {
    try {
      const response = await axios.post(`${this.baseURL}Admin/AddTeacher`, teacherDTO);
      return response.data;
    } catch (error) {
      console.error("Error adding teacher:", error);
      throw error;
    }

  }

}

export default ManageTeacherService