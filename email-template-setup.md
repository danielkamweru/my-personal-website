# EmailJS Template Setup Guide

## Current Configuration Issues Fixed

### 1. Email Template Parameters
Your EmailJS template should use these variable names:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; padding: 0; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2e1a47 0%, #ba55d3 100%); color: white; padding: 30px 20px; text-align: center; position: relative; }
        .logo { font-size: 2.5em; font-weight: 700; color: white; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .header h1 { margin: 0; font-size: 1.8em; font-weight: 600; }
        .header p { margin: 5px 0 0; opacity: 0.9; font-size: 1em; }
        .content { padding: 30px 20px; background: #f9f9f9; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #ba55d3; }
        .label { font-weight: 600; color: #2e1a47; display: block; margin-bottom: 5px; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.5px; }
        .field-value { font-size: 1.1em; color: #333; word-wrap: break-word; }
        .message-field { min-height: 100px; }
        .footer { padding: 30px 20px; text-align: center; background: white; border-top: 1px solid #eee; }
        .footer p { margin: 5px 0; font-size: 0.9em; color: #666; }
        .signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
        .signature-name { font-weight: 600; color: #2e1a47; font-size: 1.1em; }
        .signature-title { color: #ba55d3; font-size: 0.9em; margin-top: 2px; }
        .timestamp { font-size: 0.8em; color: #999; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">DKW</div>
            <h1>📧 New Contact Form Submission</h1>
            <p>{{website_name}}</p>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="label">From:</span>
                <div class="field-value">{{name}} ({{email}})</div>
            </div>
            
            <div class="field">
                <span class="label">Subject:</span>
                <div class="field-value">{{subject}}</div>
            </div>
            
            <div class="field message-field">
                <span class="label">Message:</span>
                <div class="field-value">{{message}}</div>
            </div>
            
            <div class="field">
                <span class="label">Received:</span>
                <div class="field-value timestamp">{{timestamp}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from your portfolio website contact form.</p>
            <p>Click "Reply" to respond directly to {{name}} at {{email}}</p>
            
            <div class="signature">
                <div class="signature-name">Best regards,</div>
                <div class="signature-name">Daniel Kamweru</div>
                <div class="signature-title">Software Engineer</div>
            </div>
        </div>
    </div>
</body>
</html>
```

### 2. EmailJS Service Configuration

**Service ID:** `service_ohepv9g`
**Template ID:** `template_ggdhkrf`
**Public Key:** `qK3LWu2lxraRfkila`

### 3. Template Variables Mapping

Your JavaScript now sends these variables:
- `name` - Sender's name from form
- `email` - Sender's email from form
- `subject` - Email subject from form
- `message` - Message content from form
- `to_email` - Your email address (recipient)
- `reply_to` - Reply-to address (sender's email)
- `website_name` - Your website name
- `timestamp` - When the form was submitted

### 4. EmailJS Dashboard Setup

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Verify your email service is configured correctly
3. Update your email template with the HTML above
4. Ensure the "To Email" field in your template is set to: `{{to_email}}`
5. Set "Reply To" field to: `{{reply_to}}`

### 5. Auto-Reply Template (Optional)

Create an auto-reply template to confirm receipt:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Thank you for contacting Daniel Kamweru</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Thank You!</h1>
            <p>Your message has been received</p>
        </div>
        
        <div class="content">
            <p>Hi {{from_name}},</p>
            <p>Thank you for reaching out through my portfolio website. I've received your message with the subject "{{subject}}" and will get back to you as soon as possible.</p>
            <p>Here's a copy of your message:</p>
            <blockquote style="border-left: 3px solid #007bff; padding-left: 15px; margin: 20px 0;">
                {{message}}
            </blockquote>
            <p>Best regards,<br>Daniel Kamweru</p>
        </div>
        
        <div class="footer">
            <p>This is an automated confirmation. I'll respond personally soon!</p>
            <p>Visit my portfolio: <a href="https://your-website-url.com">Daniel Kamweru Portfolio</a></p>
        </div>
    </div>
</body>
</html>
```

### 6. Testing Your Configuration

1. Test the form with different email addresses
2. Check both the recipient email and spam folder
3. Verify auto-replies work if configured
4. Test error handling with invalid emails

### 7. Common Issues & Solutions

**Issue:** Email not received
- Check EmailJS service is active
- Verify template variables match exactly
- Check spam/junk folders

**Issue:** Template variables showing as {{variable_name}}
- Ensure variable names in template match JavaScript exactly
- Check for typos in variable names

**Issue:** Reply-to not working
- Verify `reply_to` field is set in EmailJS template
- Ensure sender's email is valid

This should resolve your email delivery issues and provide a professional contact experience!
