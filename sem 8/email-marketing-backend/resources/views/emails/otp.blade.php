<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
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
                    Use the following One-Time Password (OTP) to verify your email address:
                </p>
                <p style="font-size: 28px; font-weight: bold; letter-spacing: 5px; background: #e4f1ed; padding: 15px; border-radius: 10px; text-align: center; color: #2a7b5f;">
                    {{ $otp }}
                </p>
                <p style="font-size: 14px; color: #777; margin-top: 20px;">
                    This OTP is valid for 5 minutes. Please do not share it with anyone.
                </p>
            </td>
        </tr>
    </table>

    @include('emails.footer')

</body>
</html>
