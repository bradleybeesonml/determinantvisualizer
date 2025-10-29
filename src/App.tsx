import AnimationControls from "./components/AnimationControls";
import DeterminantVisualizer from "./components/DeterminantVisualizer";
import MatrixInput from "./components/MatrixInput";
import CalculationSteps from "./components/CalculationSteps";
import { Github } from "lucide-react";
import githubProfile from "./assets/github_profile.jpeg";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header Bar */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6 relative">
          {/* GitHub Link in Top Right */}
          <div className="absolute top-4 right-4">
            <a
              href="https://github.com/bradleybeesonml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <img
                src={githubProfile}
                alt="GitHub Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <Github className="w-5 h-5 text-gray-700" />
            </a>
          </div>
          
          <h1 className="text-4xl font-bold text-center text-gray-900 pr-32">Determinant Visualizer</h1>
          <p className="text-center text-gray-600 mt-2 pr-32">
            Visualize the determinant calculation of an n x n matrix using cofactor expansion.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/3">
          <MatrixInput />
        </aside>
        <section className="lg:w-2/3 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DeterminantVisualizer />
            <CalculationSteps />
          </div>
          <AnimationControls />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>
              Linear Algebra - Determinant of a Matrix Using Cofactor Expansion Visualizer
            </p>
            <div className="mt-2 md:mt-0">
              <a
                href="https://github.com/bradleybeesonml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
