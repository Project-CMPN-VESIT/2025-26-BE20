<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $campaign->subject }}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <img src="{{ route('email.trackOpen', ['campaign' => $campaign, 'contact' => $contact]) }}" width="1" height="1" alt="" style="display:none;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px; background-color: #f4f4f4;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="background-color: #ffffff; padding: 40px; border-radius: 8px;">
                    <tr>
                        <td style="font-size: 24px; font-weight: bold; color: #333;">
                            {{ $campaign->subject }}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 20px; font-size: 16px; color: #555;">
                            {!! $content !!}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 30px; text-align: center; font-size: 12px; color: #888;">
                            <table role="presentation" cellpadding="0" cellspacing="0" align="center">
                                <tr>
                                    <td style="padding: 0 8px;">
                                        <a href="{{ route('email.trackUnsubcribe', ['campaign' => $campaign, 'contact' => $contact]) }}"
                                        style="
                                        display: inline-block;
                                        padding: 8px 14px;
                                        background-color: #f1f1f1;
                                        color: #555;
                                        text-decoration: none;
                                        border-radius: 4px;
                                        font-size: 12px;">
                                            Unsubscribe
                                        </a>
                                    </td>
                                    <td style="padding: 0 8px;">
                                        <a href="{{ route('email.trackSpam', ['campaign' => $campaign, 'contact' => $contact]) }}"
                                        style="
                                        display: inline-block;
                                        padding: 8px 14px;
                                        background-color: #f1f1f1;
                                        color: #555;
                                        text-decoration: none;
                                        border-radius: 4px;
                                        font-size: 12px;">
                                            Report spam
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <div style="padding-top: 12px;">
                                If you no longer wish to receive these emails, you can unsubscribe anytime.
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>
