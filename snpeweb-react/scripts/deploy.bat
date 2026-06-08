@echo off
git add src/components/home/AboutSection.jsx
git commit -m "fix: update AboutSection text per 수정사항 20260524 docx"
git push origin react-migration
vercel --prod --yes
echo Done.
