import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';

export default function CodePreview() {
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState('');
  const [language, setLanguage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const detectLanguage = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const langMap = {
      js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
      py: 'python', java: 'java', cpp: 'cpp', c: 'c', cs: 'csharp',
      php: 'php', rb: 'ruby', go: 'go', rs: 'rust', swift: 'swift',
      kt: 'kotlin', scala: 'scala', html: 'html', css: 'css', scss: 'scss',
      json: 'json', xml: 'xml', sql: 'sql', sh: 'bash', yaml: 'yaml',
      md: 'markdown', r: 'r', pl: 'perl', lua: 'lua', dart: 'dart'
    };
    return langMap[ext] || ext;
  };

  const handleFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setCode(content);
        setFilename(file.name);
        setLanguage(detectLanguage(file.name));
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleClear = () => {
    setCode('');
    setFilename('');
    setLanguage('');
  };

  const renderLineNumbers = () => {
    const lines = code.split('\n');
    return lines.map((_, i) => (
      <div key={i} className="text-gray-500 select-none text-right pr-4 leading-6">
        {i + 1}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Code Preview
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Upload or drag & drop any code file to preview with syntax highlighting
        </p>

        {!code ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-4 border-dashed rounded-2xl p-16 text-center transition-all ${
              isDragging
                ? 'border-purple-400 bg-purple-900/30 scale-105'
                : 'border-gray-600 bg-gray-800/50'
            }`}
          >
            <Upload className="w-20 h-20 mx-auto mb-6 text-purple-400" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Drop your code file here
            </h2>
            <p className="text-gray-400 mb-6">or</p>
            <label className="inline-block">
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.swift,.kt,.scala,.html,.css,.scss,.json,.xml,.sql,.sh,.yaml,.yml,.md,.r,.pl,.lua,.dart,.txt"
              />
              <span className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition-colors inline-block">
                Select File
              </span>
            </label>
            <p className="text-gray-500 mt-6 text-sm">
              Supports: JavaScript, Python, Java, C++, HTML, CSS, and many more!
            </p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">{filename}</span>
                <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                  {language}
                </span>
              </div>
              <button
                onClick={handleClear}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex bg-gray-900">
              <div className="bg-gray-950 py-4 pl-4 min-w-[4rem]">
                {renderLineNumbers()}
              </div>
              <pre className="flex-1 p-4 overflow-x-auto">
                <code className="text-gray-100 leading-6 font-mono text-sm">
                  {code}
                </code>
              </pre>
            </div>
          </div>
        )}

        {code && (
          <div className="mt-6 text-center">
            <label className="inline-block">
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition-colors inline-block">
                Load Another File
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
