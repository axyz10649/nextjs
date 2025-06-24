import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('❌ Parsing error:', err);
      return res.status(400).json({ detail: 'File parsing error' });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ detail: 'No file uploaded' });
    }

    let filename = file.originalFilename || file.newFilename || file.filepath || "";
    const ext = path.extname(filename).toLowerCase();
    if (!['.pdf', '.docx'].includes(ext)) {
      return res.status(400).json({ detail: 'Only PDF or DOCX files are allowed.' });
    }

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        resource_type: 'raw',
        folder: 'resumes',
      });

      return res.status(200).json({
        fileName: file.originalFilename,
        message: 'Resume uploaded successfully',
        data: {
          secure_url: result.secure_url,
          public_id: result.public_id,
          original_filename: result.original_filename,
        },
      });
    } catch (uploadErr) {
      console.error('❌ Upload failed:', uploadErr);
      return res.status(500).json({ detail: 'Upload failed: ' + uploadErr.message });
    }
  });
}