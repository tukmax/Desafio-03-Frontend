import React from "react";
import api from "./services/api"

import "./styles.css";
import { useState, useEffect } from "react";

function App() {
  const [projects, setProjects] = useState([])
  
  useEffect(()=>{
    api.get('repositories').then(res=>{
      setProjects(res.data)
    })
  }, [])

  async function handleAddRepository() {
   const response = await api.post('repositories',{
      url: "https://github.com/Rocketseat/umbriel",
      title: `Novo Repo ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    })
    const project = response.data
    setProjects([...projects, project])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
    const pro = projects.filter(proj=> proj.id !== id)
    setProjects(pro)
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {projects.map(project => 
      <li key={project.id}>{project.title}
         
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
