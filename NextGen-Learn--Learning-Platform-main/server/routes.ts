import { Router } from 'express';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is healthy' });
});

// Courses API
router.get('/courses', (req, res) => {
  res.json({ 
    success: true, 
    data: [
      { id: 'frontend', title: 'Frontend Development' },
      { id: 'backend', title: 'Backend Development' }
    ]
  });
});

// Enrollment API
router.post('/enroll', (req, res) => {
  const { courseId, userId } = req.body;
  res.json({ 
    success: true, 
    message: `User ${userId} enrolled in ${courseId} successfully` 
  });
});

// Auth API (Mock)
router.post('/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({ 
    success: true,
    user: { 
      name: email.split('@')[0], 
      email 
    },
    token: 'mock-jwt-token'
  });
});

// Code Execution API (Simulated)
router.post('/execute', (req, res) => {
  const { language, code } = req.body;
  
  // Simulation logic
  if (language === 'python') {
    if (code.includes('print')) {
      // Handle variable assignment simulation
      const varAssignMatch = code.match(/(\w+)\s*=\s*["'](.+?)["']/);
      const printVarMatch = code.match(/print\(\s*(\w+)\s*\)/);
      const printLiteralMatch = code.match(/print\(['"](.+?)['"]\)/);
      const printFStringMatch = code.match(/print\(f['"](.+?)['"]\)/);

      if (varAssignMatch && printVarMatch && varAssignMatch[1] === printVarMatch[1]) {
        return res.json({ success: true, output: varAssignMatch[2] });
      } else if (printFStringMatch) {
         // rudimentary f-string handling (just remove the brackets)
         return res.json({ success: true, output: printFStringMatch[1].replace(/\{.*?\}/, 'VALUE') });
      } else if (printLiteralMatch) {
         return res.json({ success: true, output: printLiteralMatch[1] });
      }
      
      return res.json({ success: true, output: 'Output from Python' });
    }
    return res.json({ success: true, output: 'Python script executed successfully' });
  }

  if (language === 'java') {
    // Basic simulation of variable printing
    if (code.includes('System.out.println')) {
      // 1. Look for String assignments like: String name = "nagamani";
      const stringAssignMatch = code.match(/String\s+(\w+)\s*=\s*["'](.+?)["']/);
      
      // 2. Look for the variable name inside println: System.out.println(name)
      const printlnVarMatch = code.match(/System\.out\.println\(\s*(\w+)\s*\)/);
      
      // 3. Look for literal prints: System.out.println("hello")
      const printlnLiteralMatch = code.match(/System\.out\.println\(['"](.+?)['"]\)/);

      if (stringAssignMatch && printlnVarMatch && stringAssignMatch[1] === printlnVarMatch[1]) {
        return res.json({ success: true, output: stringAssignMatch[2] });
      } else if (printlnLiteralMatch) {
         return res.json({ success: true, output: printlnLiteralMatch[1] });
      }
      
      return res.json({ success: true, output: 'Output from Java' });
    }
    return res.json({ success: true, output: 'Java program compiled and executed successfully' });
  }

  res.status(400).json({ success: false, message: 'Unsupported language for backend execution' });
});

export default router;
