'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

const services = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Full-stack applications built with cutting-edge technologies. From concept to deployment, we engineer scalable solutions that perform flawlessly.',
    capabilities: ['Next.js / React', 'Node.js / Python', 'Cloud Architecture', 'API Design', 'Database Systems', 'Performance Optimization']
  },
  {
    number: '02',
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile experiences that feel fluid and perform flawlessly across all devices. We build apps that users love.',
    capabilities: ['Flutter', 'React Native', 'iOS Development', 'Android Development', 'App Store Optimization', 'Push Notifications']
  },
  {
    number: '03',
    title: 'Interactive Experiences',
    description: 'WebGL, 3D visualizations, and immersive digital experiences that captivate and engage. We push the boundaries of web technology.',
    capabilities: ['Three.js / WebGL', 'Motion Design', 'Real-time Graphics', 'VR/AR Ready', 'Shader Programming', 'Performance Tuning']
  },
  {
    number: '04',
    title: 'System Architecture',
    description: 'Robust backend systems and infrastructure designed for scale, security, and reliability. We build the foundation for your success.',
    capabilities: ['Microservices', 'Database Design', 'DevOps / CI/CD', 'Security', 'Cloud Infrastructure', 'Monitoring & Logging']
  }
]

function ServiceSection({ service, index }: { service: typeof services[0], index: number }) {
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <div className="py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-start gap-6">
              <span className="text-6xl md:text-7xl font-display text-gray-800 leading-none">
                {service.number}
              </span>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div>
              <h4 className="text-sm tracking-wider text-gray-500 mb-4">CAPABILITIES</h4>
              <ul className="space-y-2">
                {service.capabilities.map((capability, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-3">
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div 
        className="fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #1a1a2e 0%, #0a0a0a 70%)' }}
      />

      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gray-500" />
              <span className="text-xs tracking-[0.4em] text-gray-500">WHAT WE DO</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-8">
              Services
            </h1>
            
            <p className="text-lg text-gray-400 max-w-3xl">
              We partner with ambitious teams to build digital products that matter. 
              From concept to launch, we bring technical excellence and creative vision 
              to every project.
            </p>
          </div>

          <div className="space-y-0">
            {services.map((service, index) => (
              <ServiceSection key={service.number} service={service} index={index} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Ready to start your project?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life with 
              cutting-edge technology and thoughtful design.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-4 text-sm tracking-wider text-white hover:text-gray-300 transition-colors"
            >
              GET IN TOUCH
              <span className="w-8 h-px bg-white" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSettingsButton />
    </div>
  )
}