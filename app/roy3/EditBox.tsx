export default function EditBox() {
  return (
    <form className="edit-box">
      <textarea 
        className="edit-textarea"
        placeholder="Enter your message..."
      />
      <button type="submit" className="edit-submit">
        Submit
      </button>
    </form>
  );
} 