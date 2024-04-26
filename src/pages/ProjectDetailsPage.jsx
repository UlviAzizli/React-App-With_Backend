import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

function ProjectDetailsPage(props) {
  const [project, setProject] = useState(null);

  const { projectId } = useParams();

  const getProject = () => {
    axios
      .get(`${API_URL}/projects/${projectId}?_embed=tasks`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="ProjectDetailsPage">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      <AddTask refreshProject={getProject} projectId={projectId} />

      {project &&
        project.tasks.map((task) => <TaskCard key={task.id} {...task} />)}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;
