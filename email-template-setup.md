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
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ba55d3; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #ba55d3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>{{website_name}}</p>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="label">From:</span> {{from_name}} ({{from_email}})
            </div>
            
            <div class="field">
                <span class="label">Subject:</span> {{subject}}
            </div>
            
            <div class="field">
                <span class="label">Message:</span>
                <p>{{message}}</p>
            </div>
            
            <div class="field">
                <span class="label">Sent:</span> {{timestamp}}
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from your portfolio website contact form.</p>
            <p>Reply directly to this email to respond to {{from_name}}.</p>
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
- `to_email` - Your email address (recipient)
- `from_name` - Sender's name from form
- `from_email` - Sender's email from form
- `subject` - Email subject from form
- `message` - Message content from form
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
