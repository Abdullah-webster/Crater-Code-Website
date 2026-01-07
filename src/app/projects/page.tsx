'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'
import { getAllVisibleProjects, type ProjectConfig } from '@/config/projects.config'

function ProjectCard({ project, index }: { project: ProjectConfig, index: number }) {
  return (
    <div className="group bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all">
      <div className="aspect-[16/10] bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-lg">🚀</span>
          </div>
          <p className="text-gray-400 text-sm">Project Preview</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs tracking-[0.2em] text-gray-500">
            {project.category.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500">
            {project.year}
          </span>
        </div>

        <h3 className="font-display text-xl text-white mb-3 group-hover:text-gray-300 transition-colors">
          {project.name}
        </h3>

        <p className="text-sm text-gray-500 mb-3">
          {project.tagline}
        </p>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map(tech => (
            <span
              key={tech}
              className="px-2 py-1 text-xs tracking-wider border border-gray-700 text-gray-400 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.links && (
          <div className="flex items-center gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                VIEW LIVE →
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                GITHUB →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const projects = getAllVisibleProjects()
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <div className="min-h-screen bg-black text-white">
      <div 
        className="fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #1a1a2e 0%, #0a0a0a 70%)' }}
      />

      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gray-500" />
              <span className="text-xs tracking-[0.4em] text-gray-500">OUR WORK</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-8">
              Projects
            </h1>
            
            <p className="text-lg text-gray-400 max-w-3xl">
              A selection of our recent work. Each project represents a unique challenge 
              and our commitment to delivering exceptional digital experiences.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex flex-wrap gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 text-sm tracking-wider rounded transition-colors ${
                    filter === category
                      ? 'bg-white text-black'
                      : 'border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
                  }`}
                >
                  {category === 'all' ? 'ALL' : category.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingSettingsButton />
    </div>
  )
}