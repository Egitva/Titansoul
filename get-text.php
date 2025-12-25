<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$config = [
    'host' => 'localhost',
    'dbname' => 'titansoul_cardgame',
    'username' => 'root',
    'password' => ''
];

function getDBConnection($config) {
    try {
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8";
        return new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    } catch (PDOException $e) {
        return null;
    }
}

function sendResponse($success, $data = null, $message = '') {
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message
    ]);
    exit;
}

try {
    $pdo = getDBConnection($config);
    if (!$pdo) {
        sendResponse(false, null, 'Database connection error');
    }

    $method = $_SERVER['REQUEST_METHOD'];
    $action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : 'get');

    if ($action === 'get') {
        // Fetch available card codes
        $stmt = $pdo->prepare("SELECT text_field FROM card_data WHERE id = 1");
        $stmt->execute();
        $result = $stmt->fetch();
        if ($result) {
            sendResponse(true, $result['text_field']);
        } else {
            sendResponse(false, null, 'No data found');
        }
    } elseif ($action === 'save') {
        // Save deck
        $deck = isset($_POST['deck']) ? $_POST['deck'] : '';
        if (empty($deck)) {
            sendResponse(false, null, 'Deck is empty');
        }
        $stmt = $pdo->prepare("INSERT INTO decks (deck_codes) VALUES (:deck)");
        $stmt->execute([':deck' => $deck]);
        sendResponse(true, null, 'Deck saved');
    } else {
        sendResponse(false, null, 'Invalid action');
    }
} catch (Exception $e) {
    sendResponse(false, null, 'Server error: ' . $e->getMessage());
}
?>
