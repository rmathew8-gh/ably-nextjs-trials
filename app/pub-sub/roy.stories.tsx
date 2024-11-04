import { useEffect, useState } from "react";
import axios from "axios";
import { http } from "msw";

export default {
  title: "Task",
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.example.com/sample-data", () => {
          return Response.json({
            id: 1,
            message: "This is mocked sample data",
            timestamp: new Date().toISOString(),
          });
        }),
      ],
    },
  },
};

const Task = ({ task: { title, state } }: { task: { title: string; state: string } }) => {
  const [sampleData, setSampleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/sample-data");
        setSampleData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`task ${state}`}>
      <label>
        <input type="checkbox" />
        <span>{title}</span>
        {sampleData && <div>Sample Data: {JSON.stringify(sampleData)}</div>}
      </label>
    </div>
  );
};

export const Default = {
  render: () => (
    <Task
      task={{
        title: "Test Task",
        state: "TASK_INBOX",
      }}
    />
  ),
};
