<h1 align="center">fotolab</h1>

<div>
  <p align="center">Bring the photo booth experience straight to your device!</p>
  <p align="center">An online photo booth, inspired by trending photo booths like Life4Cuts, that lets you capture and download your own photo strips in seconds.</p>
  <p align="center">Built with React.js and Supabase. Deployed with Vercel. Check it out at <a href="http://fotolab.carlahau.com">fotolab.carlahau.com</a></p>
</div>

<img width="1429" height="539" alt="Screenshot 2025-08-23 at 2 33 29 AM" src="https://github.com/user-attachments/assets/66140a58-6f79-448d-a3ec-4a220678a99e" />

## Tech Stack 
- React.js: Used for frontend user interface. 
- Supabase: Used to store metrics, such as number of photo strips created for each frame. 
- Packages: 
- react-webcam: used to access and capture webcam images. 
- react-icons: used for icons, such as camera, checkmark, etc.

## Environment Variables 
To run the project, you need a .env file in the root of your project with the following variables:
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_WEBFORM_EMAIL_API_KEY=your-web3forms-email-api-key
```
These variables are required for the frontend to connect to Supabase.
Make sure not to commit your .env file.

## Getting Started
To view the website, simply visit the following URL: https://www.fotolab.carlahau.com

If you'd like to explore the code:
1. Clone the repository: `git clone https://github.com/carlahauu/fotolab.git`
2. Navigate to the project folder: `cd fotolab`
3. Install dependencies: `npm install`
4. Run the project: `npm run dev`

## Support
If you encounter any issues or have questions about Fotolab, please open an issue on this GitHub repository.

> Built by Carla Hau
