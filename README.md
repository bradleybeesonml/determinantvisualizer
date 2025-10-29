# Determinant Visualizer

An interactive web application that visualizes the calculation of matrix determinants using cofactor expansion (Laplace expansion). Perfect for linear algebra students and educators who want to understand how determinants are computed step-by-step.

🌐 **Live Demo:** [https://determinantvisualizer.vercel.app](https://determinantvisualizer.vercel.app)

## ✨ Features

### 🧮 Core Functionality

- **Matrix Determinant Calculation**: Compute the determinant of any n×n matrix (2×2 to 5×5) using cofactor expansion
- **Step-by-step Visualization**: Watch the cofactor expansion process unfold with detailed animations
- **Interactive Matrix Input**: Click to edit matrix cells with intuitive keyboard navigation
- **Dimension Control**: Resize matrices with automatic validation
- **Preset Examples**: Quick-load common matrix scenarios for quick demonstration

### 🎨 Visual Features

- **Cell Highlighting**: Current element and active calculation pairs are highlighted
- **Minor Matrix Visualization**: See which rows and columns are removed to form minor matrices
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Modern, educational design focused on clarity

### 📚 Educational Content

- **Mathematical Theorems**: Each step explains the underlying linear algebra theory
- **Cofactor Expansion Theorem**: Detailed explanation of Laplace expansion formula
- **Sign Calculation**: Explicit demonstration of why each term is positive or negative using (-1)^(i+j)
- **Running Calculation Steps**: See the complete calculation history with sign explanations
- **Minor Matrix Definitions**: Clear explanations of how minor matrices are formed

### 🎮 Animation Controls

- **Auto-play**: Automatically step through all calculations
- **Manual Stepping**: Step forward/backward through individual operations
- **Restart Animation**: Reset and replay the entire animation
- **Calculation History**: View all terms with their sign calculations and running sums

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bradleybeesonml/determinantvisualizer.git
   cd determinantvisualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Usage Guide

### Basic Matrix Operations

1. **Set Matrix Dimensions**
   - Use the dimension controls in the input panel
   - Matrices can be sized from 2×2 to 5×5

2. **Edit Matrix Values**
   - Click any cell to edit its value
   - Use Tab/Arrow keys to navigate between cells
   - Press Enter to confirm, Escape to cancel

3. **Calculate Determinant**
   - Click "Calculate Determinant" button
   - Watch the step-by-step visualization unfold

### Understanding the Visualization

The app visualizes the **Cofactor Expansion Theorem (Laplace Expansion)**:

For an n×n matrix A, expanding along row i:

```
det(A) = Σ(j=1 to n) a_ij · C_ij
```

where:
- `a_ij` is the element at row i, column j
- `C_ij = (-1)^(i+j) · det(M_ij)` is the cofactor
- `M_ij` is the minor matrix (obtained by deleting row i and column j)

Each step shows:
- The highlighted element and its sign: `(-1)^(i+j)`
- The formation of the minor matrix
- The calculation of the minor's determinant
- The running sum of all terms

### Animation Features

1. **Start Animation**
   - Click "Play" to auto-animate through all cofactor expansion steps
   - Use "Step Forward/Backward" for manual control

2. **Visual Highlights**
   - Current element in Matrix A is highlighted in yellow
   - Rows and columns being removed are grayed out
   - Calculation steps show the complete mathematical process

3. **Calculation Steps Panel**
   - View the complete calculation history
   - See explicit sign calculations: `(-1)^(i+j) = (-1)^(row+col) = ±1`
   - Track running sums as terms are added

## 🛠️ Technical Details

### Architecture

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion for smooth transitions
- **State Management**: Zustand for global state
- **Build Tool**: Vite for fast development and optimized builds

### Key Components

- `MatrixInput`: Editable matrix component with dimension controls
- `DeterminantVisualizer`: Main visualization component displaying matrix and animation steps
- `CalculationSteps`: Sidebar showing the complete calculation history with sign explanations
- `AnimationControls`: UI controls for play/pause, stepping, and reset
- `useCofactorAnimator`: Custom hook generating animation steps from matrix input

### Matrix Operations

- Real-time validation of matrix input
- Efficient recursive determinant calculation
- Step-by-step cofactor expansion generation
- Number formatting with precision control
- Educational error messages for invalid inputs

## 📦 Deployment

### 🌐 Live Production Site

The application is deployed on Vercel:

**Production URL:** [https://determinantvisualizer.vercel.app](https://determinantvisualizer.vercel.app)

### Vercel Deployment

The project is configured for automatic deployment:

1. Push code to GitHub
2. Vercel automatically builds and deploys
3. Preview deployments for pull requests
4. Production deployments for main branch

### Manual Deployment

```bash
npm run build
vercel --prod
```

## 🧪 Testing

Run the linting:

```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Prettier for code formatting
- Ensure accessibility compliance
- Test on multiple browsers
- Write clear commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons
- **Vite** - Build tool

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/bradleybeesonml/determinantvisualizer/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/bradleybeesonml/determinantvisualizer/discussions)
- 📧 **Email**: bradleybeesonml@gmail.com

---

**Made with ❤️ for mathematics education by Bradley Beeson**
