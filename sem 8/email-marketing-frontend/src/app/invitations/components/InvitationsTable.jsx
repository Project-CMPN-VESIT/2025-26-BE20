import React, { useEffect, useState, useMemo } from "react";
import authAxios from "../../../config/AuthAxios";
import toast from "react-hot-toast";
import Table from "../../subscribers/components/Table";
import { ROLE_PERMISSIONS } from "../../../constants/roles";
import { useAuth } from "../../../context/AuthContext";
import TableSkeleton from "../../../components/skeletons/TableSkeleton";

const ROLES = [
  { label: "Workspace Admin", value: "workspace_admin" },
  { label: "Marketer", value: "marketer" },
  { label: "Viewer", value: "viewer" },
];

const InvitationsTable = () => {
  const { user } = useAuth();
  const permissions = ROLE_PERMISSIONS[user.role] || {};

  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const res = await authAxios.get("/invitation/get-all-invitations");
      setInvitations(res.data.data.invitations);
    } catch {
      toast.error("Failed to fetch invitations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const getStatus = (invite) => {
    if (invite.is_accepted) return "Accepted";
    if (new Date(invite.expires_at) < new Date()) return "Expired";
    return "Pending";
  };

  const handleResend = async (inviteId) => {
    try {
      await authAxios.put(`/invitation/resend-invitation-link/${inviteId}`);
      toast.success("Invitation resent");
      fetchInvitations();
    } catch {
      toast.error("Failed to resend invitation");
    }
  };

  const handleRoleChange = async (inviteId, role) => {
    try {
      await authAxios.put(`/invitation/update-user-role/${inviteId}`, { role });
      toast.success("Role updated");
      fetchInvitations();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const columns = useMemo(
    () => [
      {
        label: "Email",
        key: "email",
      },
      {
        label: "Role",
        key: "role",
        render: (row) => {
          const isLocked =
            row.is_accepted || new Date(row.expires_at) < new Date();

          return (
            <select
              className={`border rounded px-2 py-1 ${
                isLocked ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
              }`}
              disabled={isLocked || !permissions.canChangeRole}
              value={row.role}
              onChange={(e) => {
                if (!isLocked) {
                  handleRoleChange(row.id, e.target.value);
                }
              }}
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          );
        },
      },
      {
        label: "Status",
        key: "status",
        render: (row) => (
          <span
            className={`font-medium ${
              getStatus(row) === "Accepted"
                ? "text-success"
                : getStatus(row) === "Expired"
                ? "text-danger"
                : "text-warning"
            }`}
          >
            {getStatus(row)}
          </span>
        ),
      },
      {
        label: "Actions",
        key: "actions",
        render: (row) =>
          !row.is_accepted && new Date(row.expires_at) < new Date() && permissions.canInvite ? (
            <button 
              className="text-primary hover:underline transition-effect"
              onClick={() => handleResend(row.id)}
            >
              Resend
            </button>
          ) : (
            <span className="text-gray-400">Resend</span>
          ),
      },
    ],
    [permissions]
  );

  if (loading) {
    return (
      <div className="mt-6 bg-white p-6 mb-10 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Invitations</h2>
        <TableSkeleton rows={5} columns={4} />
      </div>
    );
  }


  return (
    <div className="mt-6 bg-white p-6 mb-10 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">All Invitations</h2>
      <Table columns={columns} data={invitations} dataTestId="invitation-row" />
    </div>
  );
};

export default InvitationsTable;
