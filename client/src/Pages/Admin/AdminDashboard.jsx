import React from 'react';
import Sidebar, { SidebarItem } from '../../Components/AdminSidebar';
import { MdDashboardCustomize, MdPeople, MdAccessTime, MdReport, MdSettings } from 'react-icons/md';

function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<MdDashboardCustomize size={20} />} text="Dashboard" active />
        <SidebarItem icon={<MdPeople size={20} />} text="Manage Doctors" />
        <SidebarItem icon={<MdPeople size={20} />} text="View Patients" />
        <SidebarItem icon={<MdAccessTime size={20} />} text="View Appointments" />
        <SidebarItem icon={<MdReport size={20} />} text="Reports" />
        <SidebarItem icon={<MdSettings size={20} />} text="Settings" />
      </Sidebar>

      <div className="flex-1">
        <div className="p-6">
          {/* Main content here */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
