import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const filePath = path.join(process.cwd(), 'users.yaml');
    const yamlData = yaml.load(fs.readFileSync(filePath, 'utf8'));

    const user = yamlData.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error reading users file' });
  }
}
