import React, { useState } from 'react';
import AddTeacherModal from '../components/forms/AddTeacher';

const ManageTeachers = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]); // This should come from API

  const openModal = (mode, teacherId = null) => {
    setIsEditMode(mode === 'edit');
    setSelectedTeacher(teacherId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setSelectedTeacher(null);
  };

  const handleTeacherSubmit = async (formData) => {
    try {
      // API call logic here
      console.log('Teacher data:', formData);
      closeModal();
      // Refresh teachers list
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  return (
    <div className="font-poppins p-8 sm:ml-64">
      <div>
        <button
          onClick={() => openModal('add')}
          className="px-4 py-2 float-right text-sm font-medium leading-5 text-white transition-colors hover:scale-110 duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Add Teachers
        </button>
      </div>
      
      <h2 className="my-6 text-2xl font-semibold text-gray-700">Manage Teachers</h2>

      {/* Modal */}
      {showModal && (
        <AddTeacherModal
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={handleTeacherSubmit}
          isEditMode={isEditMode}
          teacherData={selectedTeacher}
        />
      )}

      {/* Teachers Table */}
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Date Of Enrollment</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="text-gray-700 hover:bg-gray-200 cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://via.placeholder.com/32"
                          alt="Teacher"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{teacher.name}</p>
                        <p className="text-sm text-blue-500">{teacher.subject}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{teacher.email}</td>
                  <td className="px-4 py-3 text-sm">{teacher.dateOfEnrollment}</td>
                  <td className="px-4 py-3 text-sm">{teacher.class}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        onClick={() => openModal('edit', teacher.id)}
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => console.log('Delete teacher:', teacher.id)}
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTeachers;