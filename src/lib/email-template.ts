export const generateNewsletterHtml = ({
    subject,
    content,
    imageUrl
}: {
    subject: string;
    content: string;
    imageUrl?: string | null;
}) => {
    // Convert newlines to breaks for simple text content
    const formattedContent = content.replace(/\n/g, '<br>');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { margin: 0; padding: 0; background-color: #050505; color: #F3EFE9; font-family: 'Times New Roman', serif; }
        .container { max-width: 600px; margin: 0 auto; background-color: #09090b; overflow: hidden; }
        .header { background-color: #000; padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .logo { font-size: 24px; font-weight: bold; letter-spacing: 0.1em; color: #ffffff; text-decoration: none; }
        .logo span { color: #D2B48C; font-style: italic; }
        .hero { position: relative; width: 100%; height: 300px; background-color: #1a1a1a; overflow: hidden; }
        .hero img { width: 100%; height: 100%; object-fit: cover; }
        .content { padding: 40px 30px; line-height: 1.8; color: #e5e5e5; }
        .content h1 { font-size: 28px; color: #D2B48C; margin-bottom: 20px; font-weight: normal; }
        .cta-button { display: inline-block; padding: 12px 24px; background-color: #D2B48C; color: #000000; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 30px; border-radius: 4px; }
        .footer { background-color: #000; padding: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid rgba(255,255,255,0.1); }
        .footer a { color: #888; text-decoration: none; margin: 0 10px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <a href="https://taprovia.com" class="logo">TAPRO<span>VIA</span></a>
        </div>

        <!-- Hero Image -->
        ${imageUrl ? `
        <div class="hero">
            <img src="${imageUrl}" alt="${subject}" />
        </div>
        ` : ''}

        <!-- Content -->
        <div class="content">
            <h1>${subject}</h1>
            <div>
                ${formattedContent}
            </div>
            
            <br>
            <center>
                <a href="https://taprovia.com/shop" class="cta-button">Visit Our Shop</a>
            </center>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Taprovia Export Co. All rights reserved.</p>
            <p>
                <a href="#">Unsubscribe</a> | <a href="https://taprovia.com/privacy">Privacy Policy</a>
            </p>
            <p>Colombo, Ceylon</p>
        </div>
    </div>
</body>
</html>
  `;
};
