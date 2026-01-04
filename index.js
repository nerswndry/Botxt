<?php

$TOKEN = getenv("8559195515:AAHAyrDSfLs6-fOpxoSfHInaNPMsz7r3DjI");
$ADMIN_ID = getenv("6062006736");

$update = json_decode(file_get_contents("php://input"), true);

$message = $update["message"];
$text = trim($message["text"]);
$chat_id = $message["chat"]["id"];

$data_file = "data.json";
$data = file_exists($data_file) ? json_decode(file_get_contents($data_file), true) : [];

function sendMessage($chat_id, $text){
    global $TOKEN;
    file_get_contents("https://api.telegram.org/bot$TOKEN/sendMessage?chat_id=$chat_id&text=".urlencode($text));
}

if($text == "/start"){
    sendMessage($chat_id, "🤖 Bot 24×7 online hai ✅");
}
elseif(strpos($text, "/set") === 0 && $chat_id == $ADMIN_ID){
    $parts = explode(" ", $text, 3);
    if(count($parts) < 3){
        sendMessage($chat_id, "❌ /set CODE CONTENT");
        exit;
    }
    $data[$parts[1]] = $parts[2];
    file_put_contents($data_file, json_encode($data));
    sendMessage($chat_id, "✅ Code saved");
}
elseif(isset($data[$text])){
    sendMessage($chat_id, $data[$text]);
}
else{
    sendMessage($chat_id, "❓ Invalid code");
}