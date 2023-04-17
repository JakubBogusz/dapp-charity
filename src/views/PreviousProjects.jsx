import React from 'react'
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import ProjectsHeader from '../components/ProjectsHeader';

import { useEffect } from 'react';
import { useGlobalState } from "../store"


const PreviousProjects = () => {
  const [projects] = useGlobalState('projects');

  useEffect(async () => {
    await loadProjects();
  }, [])

  return (
    <>
      <ProjectsHeader />
      <Projects projects={projects}/>
      <Footer />
    </>
  )
}

export default PreviousProjects;
