import React, { useState } from "react";
import InviteUser from "./components/InviteUser";
import InvitationsTable from "./components/InvitationsTable";
import { useAuth } from "../../context/AuthContext";
import { ROLE_PERMISSIONS } from "../../constants/roles";

const TABS = {
  CREATE: "create",
  VIEW: "view",
};

const TeamPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(TABS.CREATE);

  const permissions = ROLE_PERMISSIONS[user.role] || {};

  return (
    <div className="pl-1 pt-10">
      <h1 className="text-2xl font-semibold mb-6">Team Management</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-12">
        {permissions.canInvite && (
          <button
            onClick={() => setActiveTab(TABS.CREATE)}
            className={`pb-2 font-medium transition-effect ${
              activeTab === TABS.CREATE
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            Create Invitation
          </button>
        )}

        {permissions.canViewInvitations && (
          <button
            onClick={() => setActiveTab(TABS.VIEW)}
            className={`pb-2 font-medium transition-effect ${
              activeTab === TABS.VIEW
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            View Invitations
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === TABS.CREATE && permissions.canInvite && (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <InviteUser />
            </div>
          </div>
        )}

        {activeTab === TABS.VIEW && permissions.canViewInvitations && (
          <InvitationsTable />
        )}
      </div>
    </div>
  );
};
export default TeamPage;
