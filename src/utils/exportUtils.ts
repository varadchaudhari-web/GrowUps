// Export Utilities for Business Plans, Reports, and Documents

export const exportToDocx = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPDF = (filename: string, title: string, htmlContent: string) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate and print PDF');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} — GrowUps Export</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            color: #1e293b;
            padding: 40px;
            line-height: 1.6;
          }
          .header {
            border-bottom: 2px solid #2563eb;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .brand {
            font-size: 24px;
            font-weight: 800;
            color: #2563eb;
          }
          .title {
            font-size: 20px;
            color: #0f172a;
            margin-top: 8px;
          }
          .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #0f172a;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
            margin-bottom: 8px;
          }
          .badge {
            background: #e0f2fe;
            color: #0369a1;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            display: inline-block;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">GrowUps Platform</div>
          <div class="title">${title}</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 4px;">
            Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} | Confidential
          </div>
        </div>
        <div>
          ${htmlContent}
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

export const copyShareableLink = (resourceType: string, id: string): string => {
  const url = `${window.location.origin}/#/${resourceType}/${id}?ref=growups_share`;
  navigator.clipboard.writeText(url);
  return url;
};
