import React, { useMemo } from "react";
import dayjs from "dayjs";
import { Button, Divider } from "@mui/material";
import DateIcon from "@mui/icons-material/DateRangeOutlined";

const CompletedTaskItem = ({ task, onDelete }) => {
  // Get project name by task.id from localStorage
  const projectName = useMemo(() => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const match = projects.find((p) => p.id === task.projectId);
    return match ? match.name : task.projectId;
  }, [task.projectId]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "start" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15 }}>{task.title}</p>
          <p dangerouslySetInnerHTML={{ __html: task.description }} />
          {/* Show source path */}
          <p>
            {task.source === "home_projects_data"
              ? `Home/${task.category}`
              : `My Projects/${projectName.replaceAll("-", " ").to}/${
                  task.category
                }`}
          </p>
          {/* Due date and priority */}
          {task.dueDate && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <DateIcon style={{ fontSize: "14px", color: "grey" }} />
              <p
                style={{
                  fontSize: "13px",
                  color: "grey",
                  marginLeft: "5px",
                }}
              >
                {(() => {
                  const currentYear = new Date().getFullYear();
                  const dueDate = new Date(task.dueDate);
                  const options = {
                    day: "2-digit",
                    month: "short",
                    ...(dueDate.getFullYear() !== currentYear && {
                      year: "numeric",
                    }),
                  };
                  return new Intl.DateTimeFormat("en-GB", options).format(
                    dueDate
                  );
                })()}
              </p>
            </div>
          )}
          <strong>Priority:</strong> {task.priority}
        </div>

        {/* Delete button */}
        <Button
          onClick={() => onDelete(task.id)}
          variant="contained"
          sx={{
            backgroundColor: "#ff7800",
            "&:hover": { backgroundColor: "#ff871f" },
          }}
          disableElevation
          size="small"
          style={{
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "12px",
            marginRight: "6px",
          }}
        >
          Delete
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default CompletedTaskItem;
