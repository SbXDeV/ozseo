<?php
$tosend = "office@carbontecrus.ru"; //To:
$subject = "Заказ с сайта Carbontec"; //Subject:
$from_name = "Carbontecrus"; //From:
$from_email = "email@email.com"; //From:

////NO EDIT
if(!isset($_POST['act'])) {
	exit();
}
switch($_POST['act']) {
	case 'sender':
		if(empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['subject'])) {
			exit();
		}
		$name = $_POST['name'];
		$phone = $_POST['phone'];
		$email = $_POST['email'];
		$subject2 = $_POST['subject'];

		$msg  = "<p><strong>".$subject2."</strong></p>\r\n";
		$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
		$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
		if($email != 'none') $msg .= "<p><strong>Email:</strong> ".$email."</p>\r\n";

		$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
		$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";

		if(mail($tosend, "=?UTF-8?B?".base64_encode($subject." ".$subject2)."?=", $msg, $headers)) {
			echo json_encode(array('result' => 'ok'));
		} else {
			echo json_encode(array('result' => 'fail'));
		}
	break;
	case 'flist':
		if(empty($_POST['firm']) || empty($_POST['phone'])) {
			exit();
		}

		$msg  = "<p><strong>ОПРОСНЫЙ ЛИСТ</strong></p>\r\n";
		$msg .= "<p><strong>1. Заказчик:</strong></p>\r\n";
		$msg .= "<p><strong>Фирма:</strong> ".$_POST['firm']."</p>\r\n";
		$msg .= "<p><strong>Ф.И.О. ответственного лица:</strong> ".$_POST['fname']."</p>\r\n";
		$msg .= "<p><strong>Телефон:</strong> ".$_POST['phone']."</p>\r\n";
		$msg .= "<p><strong>Email:</strong> ".$_POST['email']."</p>\r\n";
		
		$msg .= "<p><strong>2. Объект:</strong></p>\r\n";
		$msg .= "<p><strong>Местоположение/Регион:</strong> ".$_POST['olocal']."</p>\r\n";
		$msg .= "<p><strong>Функциональное предназначение:</strong> ".$_POST['ofunc']."</p>\r\n";
		$msg .= "<p><strong>Выделенная электрическая мощность, кВт:</strong> ".$_POST['ow']."</p>\r\n";
		$msg .= "<p><strong>Требуемая температура внутри помещения, °С:</strong> ".$_POST['ot']."</p>\r\n";
		$msg .= "<p><strong>Тип отопления (основное/дополнительное):</strong> ".$_POST['otype']."</p>\r\n";
		$msg .= "<p><strong>Тип теплоизоляции здания/толщина:</strong> ".$_POST['oterm']."</p>\r\n";
		
		$msg .= "<p><strong>3. Конструкция потолка:</strong></p>\r\n";
		$msg .= "<p><strong>Материал отделки потолка (гипсокартон, бетонные перекрытия или иное):</strong> ".$_POST['kpmaterial']."</p>\r\n";
		$msg .= "<p><strong>Декоративное покрытие потолка (краска, побелка или иное):</strong> ".$_POST['kpdekor']."</p>\r\n";
		$msg .= "<p><strong>Высота потолка, м:</strong> ".$_POST['kph']."</p>\r\n";
		$msg .= "<p><strong>Планируется ли монтаж подвесного/натяжного потолка?:</strong> ".$_POST['kpmontaj']."</p>\r\n";
		
		$msg .= "<p><strong>4. Конструкция стен:</strong></p>\r\n";
		$msg .= "<p><strong>Материал отделки стен (гипсокартон, штукатурка или иное):</strong> ".$_POST['ksmaterial']."</p>\r\n";
		$msg .= "<p><strong>Декоративное покрытие стен (краска, обои, декоративная штукатурка или иное):</strong> ".$_POST['ksdekor']."</p>\r\n";
		
		$msg .= "<p><strong>5. Остекление:</strong></p>\r\n";
		$msg .= "<p><strong>Тип остекления (стеклопакет одинарный/двойной, алюминиевый профиль, деревянные рамы или иное):</strong> ".$_POST['osglass']."</p>\r\n";
		$msg .= "<p><strong>Площадь панорамного остекления (если присутствует), м²:</strong> ".$_POST['oss']."</p>\r\n";

		$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
		$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";

		if(mail($tosend, "=?UTF-8?B?".base64_encode($subject." ".$subject2)."?=", $msg, $headers)) {
			echo json_encode(array('result' => 'ok'));
		} else {
			echo json_encode(array('result' => 'fail'));
		}
	break;
	default: exit();
}
?>