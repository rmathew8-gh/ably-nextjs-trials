export const mockMessages = {
  empty: [],
  single: [
    { id: "1", label: "Only message", isActive: true },
  ],
  default: [
    { id: "1", label: "First message", isActive: true },
    { id: "2", label: "Second message", isActive: false },
    { id: "3", label: "Third message", isActive: true },
  ],
  long: [
    {
      id: "1",
      label: "This is a very long message that might need special handling in the UI to ensure it displays correctly and doesn't break the layout",
      isActive: true,
    },
    {
      id: "2",
      label: "Another long message with some technical content: ERROR_CODE_5123: Connection timeout after 30000ms",
      isActive: false,
    },
  ],
}; 