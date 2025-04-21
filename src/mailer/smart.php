<?php 

if(!empty($_POST['name']) && !empty($_POST['number']) && !empty($_POST['email'])) {

	$name = $_POST['name'];
	$number = $_POST['number'];
	$email = $_POST['email'];

	require_once('phpmailer/PHPMailerAutoload.php');
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';

	$mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'k1.guliaev@yandex.ru';                 // Наш логин
	$mail->Password = 'mzdtgktucfyzkwtk';                           // Наш пароль от ящика
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;                                    // TCP port to connect to
	
	$mail->setFrom('k1.guliaev@yandex.ru', 'Olma Web Company(Заявка с сайта):');   // От кого письмо
	$mail->addAddress('k1.guliaev@yandex.ru');     // Add a recipient Кому письмо
	//$mail->addAddress('ellen@example.com');               // Name is optional
	//$mail->addReplyTo('info@example.com', 'Information');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');
	//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'Данные';
	$mail->Body    = '
			<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; font-size: 16px; color: #333333;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 30px;">
                      <h1 style="font-size: 24px; color: #29abe2; margin-top: 0;">Новая заявка с сайта</h1>
                      <p>У вас новая заявка с сайта. Подробности:</p>
                      <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="padding: 5px 0; width: 120px; font-weight: bold;">Имя:</td>
                          <td style="padding: 5px 0;">' . htmlspecialchars($name) . '</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; font-weight: bold;">Email:</td>
                          <td style="padding: 5px 0;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #29abe2; text-decoration: none;">' . htmlspecialchars($email) . '</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; font-weight: bold;">Телефон:</td>
                          <td style="padding: 5px 0;">' . htmlspecialchars($number) . '</td>
                        </tr>
                      </table>
                      <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
                      <p style="font-size: 12px; color: #777777; text-align: center;">Вам отправили заявку с вашего сайта!</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
		';

	if(!$mail->send()) {
		return false;
	} else {
		return true;
	}
} else {
	echo "<p style='color: red'>Ошибка отправки заявки!</p>";
}
