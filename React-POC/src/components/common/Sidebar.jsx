import React, { useState } from 'react'
import logo from '../../assets/1.png'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'

function Sidebar({ role }) {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  // Define menu items based on roles
  const getMenuItems = (userRole) => {
    const commonItems = [
      {
        name: 'Dashboard',
        link: '/',
        icon: 'https://img.icons8.com/material-outlined/24/dashboard.png'
      }
    ];

    const adminItems = [
      {
        name: 'Students',
        link: '/students',
        icon: 'https://img.icons8.com/material-outlined/24/student-male.png'
      },
      {
        name: 'Teachers',
        link: '/teachers', 
        icon: 'https://img.icons8.com/material-outlined/24/teacher.png'
      },
      {
        name: 'Classes',
        link: '/classes',
        icon: 'https://img.icons8.com/material-outlined/24/classroom.png'
      },
     
    ];

    const teacherItems = [
      {
        name: 'My Classes',
        link: '/my-classes',
        icon: 'https://img.icons8.com/material-outlined/24/classroom.png'
      },
      {
        name: 'Students',
        link: '/my-students',
        icon: 'https://img.icons8.com/material-outlined/24/student-male.png'
      },
      {
        name: 'Assignments',
        link: '/assignments',
        icon: 'https://img.icons8.com/material-outlined/24/assignment.png'
      }
    ];

    const studentItems = [
      {
        name: 'My Courses',
        link: '/my-courses',
        icon: 'https://img.icons8.com/material-outlined/24/book.png'
      },
      {
        name: 'Assignments',
        link: '/my-assignments',
        icon: 'https://img.icons8.com/material-outlined/24/assignment.png'
      },
      {
        name: 'Grades',
        link: '/grades',
        icon: 'https://img.icons8.com/material-outlined/24/report-card.png'
      }
    ];

    switch(userRole) {
      case 'Admin':
        return [...commonItems, ...adminItems];
      case 'Teacher':
        return [...commonItems, ...teacherItems];
      case 'Student':
        return [...commonItems, ...studentItems];
      default:
        return commonItems;
    }
  };

  const sidebarItems = getMenuItems(role);

  const handleSetActiveTab = (tabName) => {
    setActiveTab(tabName)
  }

  const handleLogout = () => {
    authService.clearAuthData()
    navigate('/login')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed h-screen shadow-2xl z-20 w-64 overflow-y-auto text-white bg-white flex-shrink-0 ${
          sidebarOpen ? 'block' : 'hidden'
        } md:block`}
        aria-label="Sidebar"
      >
        <div className="py-4 text-white">
          <a className="flex items-center ps-2.5 mb-5">
            <img src={logo} className="w-36 mx-10" alt="Logo" />
          </a>

          <ul className="mt-6 font-poppins">
            {sidebarItems.map((item) => (
              <li
                key={item.name}
                className={`relative px-6 py-3 cursor-pointer ${
                  activeTab === item.name ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleSetActiveTab(item.name)}
              >
                <span
                  className={`absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg ${
                    activeTab !== item.name ? 'hidden' : ''
                  }`}
                  aria-hidden="true"
                />
                <a
                  href={item.link}
                  className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(item.link)
                  }}
                >
                  <img src={item.icon} className="w-5 h-5 mr-2" alt={item.name} />
                  <span className="ml-4">{item.name}</span>
                </a>
              </li>
            ))}
            
            {/* Logout */}
            <li className="relative px-6 py-3 cursor-pointer" onClick={handleLogout}>
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              />
              <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M936.129 614.608l-353.505 0.004c-12.402-0.004-24.808 6.199-31.008 12.399 6.203-43.407 24.805-86.822 55.814-117.831 80.627-80.626 213.962-83.724 297.687 0 34.11 34.11 52.716 77.522 55.818 117.836-0.001-6.205-12.403-12.404-24.806-12.408zM448.087 392.551c-88.922 0-164.163-71.822-164.163-164.164s71.82-164.164 164.163-164.164c88.923 0 164.164 71.822 164.164 164.164s-75.242 164.164-164.164 164.164z" />
                  <path d="M558.657 471.116c-51.3 45.351-82.08 117.154-82.08 192.741 0 86.919 37.621 158.725 95.759 204.077-47.88-11.34-86.601-26.455-144.743-26.455-201.784 7.56-362.528 154.945-362.528-68.028 0-222.972 160.743-325.011 359.107-325.011 54.722-0.001 90.026 7.56 134.485 22.676z" />
                  <path d="M576.423 704.536l353.5-0.001c12.406 0 24.808-6.199 31.011-12.402-6.198 43.411-24.808 86.826-58.919 120.936-80.623 80.623-213.961 83.725-297.687 0-34.109-34.109-52.712-77.524-55.814-117.838 3.103 3.102 15.503 9.305 27.909 9.305z" />
                </svg>
                <span className="ml-4">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar