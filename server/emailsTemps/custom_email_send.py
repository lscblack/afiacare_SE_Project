def custom_email(names,heading,msg):
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afia Care</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossorigin="anonymous" referrerpolicy="no-referrer">
</head>
<body style="background-color: #f4f8fb; font-family: Arial, sans-serif; padding: 10px;">
<div style="max-width: 640px; margin: 40px auto; background-color: #ffffff; padding: 24px; color: #4a5568; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 2.125rem; margin-bottom: 16px;">Afia Care</p>
    <p style="font-size: 1.125rem; margin-bottom: 16px;">Hi {names},</p>
    <p style="margin-bottom: 16px;">{heading}</p>
    <p style="margin-bottom: 16px;">
        {msg}
    </p>
    <p style="margin-bottom: 16px;">
        If you have any questions or need assistance, feel free to reach out to us.
    </p>
    <p style="margin-bottom: 16px;">Regards,<br />The Afia Care Team</p>
    <hr style="margin-bottom: 16px;" />
    <p style="font-size: 0.75rem; margin-top: 12px; text-align: center;">
        You can visit our website via:
        <a href="https://www.afiacare.tech/" style="color: #3182ce;">https://www.afiacare.tech/</a>
    </p>
</div>
</body>
</html>
"""
