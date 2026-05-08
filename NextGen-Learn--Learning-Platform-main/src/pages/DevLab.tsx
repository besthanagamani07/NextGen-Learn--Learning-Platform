import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import * as Babel from '@babel/standalone';
import { 
  Terminal as TerminalIcon, Play, Save, RotateCcw, 
  ChevronRight, Folder, FileCode, Palette, 
  Settings, Monitor, Layout, Cpu, Code2, 
  Zap, Globe, Terminal, Sun, Moon, Trash2,
  Sparkles, Download, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FileData {
  content: string;
}

const LANG_CONFIG: Record<string, { name: string; language: string; icon: React.ReactNode }> = {
  'html': {
    name: 'index.html',
    language: 'html',
    icon: <Globe className="w-4 h-4 text-orange-500" />
  },
  'css': {
    name: 'styles.css',
    language: 'css',
    icon: <Palette className="w-4 h-4 text-blue-500" />
  },
  'javascript': {
    name: 'script.js',
    language: 'javascript',
    icon: <Code2 className="w-4 h-4 text-yellow-500" />
  },
  'react': {
    name: 'App.jsx',
    language: 'javascript',
    icon: <Zap className="w-4 h-4 text-blue-400" />
  },
  'python': {
    name: 'main.py',
    language: 'python',
    icon: <Terminal className="w-4 h-4 text-blue-500" />
  },
  'java': {
    name: 'Main.java',
    language: 'java',
    icon: <Cpu className="w-4 h-4 text-red-500" />
  }
};

const INITIAL_FILES: Record<string, FileData> = {
  'html': {
    content: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; background: #f0f4f8; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    h1 { color: #6C5CE7; text-shadow: 0 4px 6px rgba(108, 92, 231, 0.2); transition: transform 0.3s; }
    h1:hover { transform: scale(1.1); }
    .card { background: white; padding: 2rem; border-radius: 1.5rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello from DevLab</h1>
    <p>Modern browser-based IDE for NextGen Learn</p>
    <button onclick="alert('Action!')">Click Me</button>
  </div>
</body>
</html>`
  },
  'css': {
    content: `/* Add modern styles */
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}`
  },
  'javascript': {
    content: `// JavaScript Playground
const users = ['Alice', 'Bob', 'Charlie'];

function welcomeUsers(list) {
  list.forEach(user => {
    console.log(\`[System] Welcome, \${user}! Ready to code?\`);
  });
}

welcomeUsers(users);

// asynchronous demo
setTimeout(() => {
  console.log("Async operation complete after 2 seconds");
}, 2000);`
  },
  'react': {
    content: `import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: active ? '#6C5CE7' : '#00D2FF', transition: 'color 0.5s' }}>
        React in DevLab
      </h1>
      <div style={{ fontSize: '48px', margin: '20px' }}>{count}</div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', background: '#6C5CE7', color: 'white', border: 'none' }}
        >
          Increment
        </button>
        <button 
          onClick={() => setActive(!active)}
          style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', background: '#00D2FF', color: 'white', border: 'none' }}
        >
          Toggle Color
        </button>
      </div>
    </div>
  );
}`
  },
  'python': {
    content: `# Welcome to Python DevLab
def calculate_growth(initial, rate, years):
    return initial * (1 + rate) ** years

result = calculate_growth(1000, 0.05, 10)
print(f"Investment after 10 years: \${result:.2f}")

# Try list comprehensions
squares = [x**2 for x in range(10)]
print(f"Squares: {squares}")`
  },
  'java': {
    content: `public class Main {
    public static void main(String[] args) {
        System.out.println("DevLab Java Environment");
        
        String[] languages = {"HTML", "CSS", "JS", "React", "Python", "Java"};
        
        for(String lang : languages) {
            System.out.println("Processing language: " + lang);
        }
    }
}`
  }
};

export default function DevLab() {
  const [activeLang, setActiveLang] = useState('html');
  const [files, setFiles] = useState<Record<string, FileData>>(() => {
    const saved = localStorage.getItem('devlab-files');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });
  const [output, setOutput] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentFile = files[activeLang];
  const currentConfig = LANG_CONFIG[activeLang];

  useEffect(() => {
    localStorage.setItem('devlab-files', JSON.stringify(files));
  }, [files]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    const code = currentFile.content;

    if (activeLang === 'html') {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = code;
      }
      setIsRunning(false);
    } else if (activeLang === 'react') {
      try {
        const transformed = Babel.transform(code, {
          presets: ['react'],
          filename: 'App.jsx'
        }).code;

        if (iframeRef.current && transformed) {
          const html = `
            <!DOCTYPE html>
            <html>
              <head>
                <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                <script src="https://cdn.tailwindcss.com"></script>
              </head>
              <body>
                <div id="root"></div>
                <script>
                  const { React, ReactDOM } = window;
                  try {
                    ${transformed.replace('export default function App', 'function App')}
                    const root = ReactDOM.createRoot(document.getElementById('root'));
                    root.render(React.createElement(App));
                  } catch (err) {
                    document.body.innerHTML = '<pre style="color:red">' + err.message + '</pre>';
                  }
                </script>
              </body>
            </html>
          `;
          iframeRef.current.srcdoc = html;
        }
      } catch (err: any) {
        setOutput([`Babel Error: ${err.message}`]);
      }
      setIsRunning(false);
    } else if (activeLang === 'javascript') {
      const logs: string[] = [];
      const safeConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
      };

      try {
        // Simple sandbox using Function constructor
        // eslint-disable-next-line no-new-func
        const fn = new Function('console', code);
        fn(safeConsole);
        setOutput(logs);
      } catch (err: any) {
        setOutput([`Runtime Error: ${err.message}`]);
      }
      setIsRunning(false);
    } else if (activeLang === 'python' || activeLang === 'java') {
      try {
        const response = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: activeLang, code })
        });
        const result = await response.json();
        if (result.success) {
          setOutput([result.output]);
        } else {
          setOutput([`Execution Error: ${result.message}`]);
        }
      } catch (err: any) {
        setOutput([`Network Error: Failed to reach backend`]);
      }
      setIsRunning(false);
    }
  };

  const handleSuggest = async () => {
    setIsSuggesting(true);
    // In a real app we'd call Gemini here. For now, let's simulate a helpful addition.
    setTimeout(() => {
      let snippet = "";
      if (activeLang === 'javascript') snippet = "\n\n// AI Suggestion: Array mapping example\nconst doubled = users.map(u => u.toUpperCase());\nconsole.log('Doubled:', doubled);";
      if (activeLang === 'python') snippet = "\n\n# AI Suggestion: Lambda example\nmultiply = lambda x, y: x * y\nprint(f'Product: {multiply(5, 5)}')";
      
      if (snippet) {
        updateCode(currentFile.content + snippet);
      }
      setIsSuggesting(false);
    }, 1000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the current file to its initial state?')) {
      setFiles(prev => ({
        ...prev,
        [activeLang]: INITIAL_FILES[activeLang]
      }));
      setOutput([]);
    }
  };

  const clearOutput = () => setOutput([]);

  const updateCode = (val: string | undefined) => {
    if (val === undefined) return;
    setFiles(prev => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], content: val }
    }));
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-64px)] ${isDarkMode ? 'bg-[#0d0f14]' : 'bg-slate-50'}`}>
      
      {/* Top Toolbar */}
      <div className={`h-12 border-b flex items-center justify-between px-4 ${isDarkMode ? 'bg-[#1a1c24] border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6C5CE7] rounded-lg flex items-center justify-center">
              <TerminalIcon className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-sm hidden md:block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>DevLab IDE</span>
          </div>
          <div className={`h-4 w-[1px] hidden md:block ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
          <div className="flex items-center gap-1">
            <button 
              onClick={handleReset}
              title="Reset Code"
              className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                const blob = new Blob([currentFile.content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = currentConfig.name;
                a.click();
              }}
              title="Download File"
              className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleSuggest}
            disabled={isSuggesting}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isDarkMode ? 'bg-white/5 text-[#00D2FF] hover:bg-white/10' : 'bg-slate-100 text-[#00D2FF] hover:bg-slate-200'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isSuggesting ? 'animate-spin' : ''}`} />
            {isSuggesting ? 'Thinking...' : 'AI Suggestion'}
          </button>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button 
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-1.5 bg-[#6C5CE7] hover:bg-[#5D4ED1] text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-[#6C5CE7]/20 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-white ${isRunning ? 'animate-pulse' : ''}`} /> Run
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 📁 LEFT PANEL: Explorer */}
        <aside className={`w-12 md:w-64 border-r flex flex-col ${isDarkMode ? 'bg-[#1a1c24] border-white/5' : 'bg-white border-slate-200'}`}>
          <div className="hidden md:flex p-4 border-b border-white/5 items-center justify-between">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Project Explorer</span>
            <div className="flex gap-1">
               <button className="p-1 hover:bg-white/5 rounded"><Folder className="w-3 h-3 text-slate-500" /></button>
               <button className="p-1 hover:bg-white/5 rounded" onClick={() => localStorage.clear()}><Trash2 className="w-3 h-3 text-red-500/50" /></button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 md:p-3">
            <div className="space-y-6">
              {/* Languages Section */}
              <div className="space-y-1">
                {Object.keys(files).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`w-full flex items-center gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all text-sm font-bold group relative ${
                      activeLang === lang 
                        ? 'bg-[#6C5CE7]/10 text-[#6C5CE7] border border-[#6C5CE7]/20 shadow-xl shadow-[#6C5CE7]/10' 
                        : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="flex-shrink-0">{LANG_CONFIG[lang].icon}</div>
                    <span className="truncate hidden md:block">{LANG_CONFIG[lang].name}</span>
                    {activeLang === lang && (
                      <motion.div layoutId="active-file" className="absolute left-0 w-1 h-5 bg-[#6C5CE7] rounded-r-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block p-6 border-t border-glass bg-white/5">
             <div className="flex items-center gap-3 p-4 bg-[#0d0f14] rounded-2xl border border-glass animate-pulse">
                <Cpu className="w-5 h-5 text-[#00D2FF]" />
                <div>
                   <p className="text-[10px] font-black text-white uppercase">Compiler</p>
                   <p className="text-[8px] font-bold text-slate-500 uppercase">Ready • v2.4.0</p>
                </div>
             </div>
          </div>
        </aside>

        <Split 
          className="flex flex-1"
          sizes={[60, 40]}
          minSize={200}
          gutterSize={4}
          gutterStyle={() => ({
            backgroundColor: isDarkMode ? '#1a1c24' : '#e2e8f0',
          })}
        >
          {/* 🖥️ CENTER PANEL: Editor */}
          <div className="flex flex-col min-w-0 h-full">
            <div className={`h-10 border-b flex items-center px-4 gap-2 ${isDarkMode ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-slate-200'}`}>
              <div className={`flex items-center gap-2 px-4 py-2 h-full border-b-2 border-[#6C5CE7] ${isDarkMode ? 'bg-white/5 text-white' : 'bg-slate-50 text-slate-900'}`}>
                {LANG_CONFIG[activeLang].icon}
                <span className="text-xs font-bold">{LANG_CONFIG[activeLang].name}</span>
              </div>
            </div>
            <div className="flex-1 min-h-0 bg-[#1e1e1e]">
              <Editor
                height="100%"
                theme={isDarkMode ? 'vs-dark' : 'light'}
                language={LANG_CONFIG[activeLang].language}
                value={currentFile.content}
                onChange={updateCode}
                options={{
                  fontSize: 14,
                  fontFamily: 'JetBrains Mono, monospace',
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  padding: { top: 20 },
                  lineNumbers: 'on',
                  roundedSelection: true,
                  automaticLayout: true,
                  cursorBlinking: 'smooth',
                  smoothScrolling: true,
                }}
              />
            </div>
          </div>

          {/* 📊 RIGHT PANEL: Output Area */}
          <div className={`flex flex-col h-full ${isDarkMode ? 'bg-[#1a1c24] border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="h-10 border-b flex items-center justify-between px-4 bg-white/5">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#6C5CE7]" />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>
                  { (activeLang === 'html' || activeLang === 'react') ? 'Live Preview' : 'Console Output' }
                </span>
              </div>
              {output.length > 0 && (activeLang !== 'html' && activeLang !== 'react') && (
                <button onClick={clearOutput} className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
              {(activeLang === 'html' || activeLang === 'react') ? (
                <div className="flex-1 bg-white relative">
                  <iframe
                    ref={iframeRef}
                    title="DevLab Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-modals allow-forms allow-popups"
                  />
                  {isRunning && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                       <div className="w-8 h-8 border-4 border-[#6C5CE7] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 ${isDarkMode ? 'bg-[#0d0f14] text-green-400' : 'bg-slate-50 text-slate-800'} custom-scrollbar`}>
                  {output.length === 0 ? (
                    <div className="text-slate-600 italic">Click "Run" to execute {currentConfig.name}...</div>
                  ) : (
                    output.map((line, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={`flex gap-2 ${line.includes('Error') ? 'text-red-400 bg-red-400/5 p-1 rounded' : ''}`}
                      >
                        <span className="text-slate-600">$</span>
                        <span className="whitespace-pre-wrap">{line}</span>
                      </motion.div>
                    ))
                  )}
                  {isRunning && (
                    <div className="flex items-center gap-2 text-blue-400">
                       <span className="animate-pulse">●</span>
                       <span>Executing...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Status Bar */}
            <div className={`h-6 border-t flex items-center justify-between px-3 text-[10px] font-bold ${isDarkMode ? 'bg-[#1a1c24] border-white/5 text-slate-500' : 'bg-white border-slate-200 text-slate-400'}`}>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                     <Layout className="w-3 h-3" />
                     <span>UTF-8</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <Settings className="w-3 h-3" />
                     <span>{LANG_CONFIG[activeLang].language.toUpperCase()}</span>
                  </div>
               </div>
               <div className="flex items-center gap-1 text-[#6C5CE7]">
                  <div className="w-1.5 h-1.5 bg-[#6C5CE7] rounded-full animate-ping" />
                  <span>Cloud Sync Active</span>
               </div>
            </div>
          </div>
        </Split>
      </div>

      <style>{`
        .gutter {
          background-position: 50%;
          background-repeat: no-repeat;
        }
        .gutter.gutter-horizontal {
          cursor: col-resize;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAG8aZNm8iGgB6A7mYgh9Pnz59nMADq6Anf69SEpAAAAABJRU5ErkJggg==');
        }
      `}</style>
    </div>
  );
}
