<?php
header('Content-Type': 'application/json');
require_once '/includes/database.php';

$stmt = $pdo->query("SELECT `id`, `name`, `description`, `types_id`, `atk_def`, `cost` FROM `card`");
$cards = $stmt->fetchAll(PDO::FETCH_ASSOC);
// Добавляем полный URL к изображениям
foreach ($cards as &$card) {
    $card['id'] = '/images/Cards/' . $card['id'];
}
echo json_encode($cards);
?>