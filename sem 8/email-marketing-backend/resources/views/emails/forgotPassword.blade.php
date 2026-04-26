<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fogot Password Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fffaf5; color: #333;">

    @include('emails.header')

    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px;">
        <tr>
            <td>
                <h2 style="color: #444;">Verify Your Email</h2>
                <p style="font-size: 16px; line-height: 1.5;">
                    Hello,
                </p>
                <p style="font-size: 16px; line-height: 1.5;">
                    Please click the button below to change the password:
                </p>

                <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                    <tr>
                        <td align="center" bgcolor="#2a7b5f" style="border-radius: 8px;">
                            <a href="{{ $url }}" target="_blank" 
                               style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; text-decoration: none; border-radius: 8px;">
                                Change Password
                            </a>
                        </td>
                    </tr>
                </table>

                <p style="font-size: 14px; color: #777;">
                    This link is valid for 10 minutes. If you did not expect this forgot password link, you can ignore this email.
                </p>
            </td>
        </tr>
    </table>

    @include('emails.footer')

</body>
</html>
