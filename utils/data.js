export const CreateGroupformFields = [
  { label: "Group Name", name: "name", type: "text" },
  { label: "Max Members", name: "max_users", type: "number" },
  { label: "Starting Date", name: "startDate", type: "date" },
  {
    label: "Contribution Type",
    as: "select",
    name: "contribution_type",
    options: [
      { text: "Select Contribution Type", value: "" },
      { text: "Daily", value: "daily" },
      { text: "Weekly", value: "weekly" },
      { text: "Monthly", value: "monthly" },
    ],
  },
  {
    label: "Disbursement Type",
    as: "select",
    name: "disbursement_type",
    options: [
      { text: "Select Disbursement Type", value: "" },
      { text: "Daily", value: "daily" },
      { text: "Weekly", value: "weekly" },
      { text: "Monthly", value: "monthly" },
    ],
  },
  { label: "Amount Per User", name: "amount", type: "number" },
  { label: "Description", name: "description", as: "textarea", rows: "4" },
];
