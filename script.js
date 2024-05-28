// script.js
function convertToJSON(inputId, outputId, copyButtonId) {
    const inputElement = document.getElementById(inputId);
    let input = inputElement.value;

    // 移除开头和结尾的引号
    if (input.startsWith('"') && input.endsWith('"')) {
        input = input.slice(1, -1);
        inputElement.value = input;  // 更新输入框内容
    }

    const lines = input.split('\n').filter(line => line.trim() !== '');
    const result = lines.map(line => {
        const parts = line.split(/\s+/);
        return {
            name: parts[0],
            value: parts[1],
            domain: parts[2],
            path: parts[3],
            expiry: new Date(parts[4]).getTime() / 1000, // 转换成timestamp
            httpOnly: parts[5] === '✓',
            secure: parts[6] === '✓'
        };
    });

    const output = JSON.stringify(result, null, 2);
    document.getElementById(outputId).textContent = output;

    // 显示复制按钮
    document.getElementById(copyButtonId).style.display = 'inline-block';
}

function copyToClipboard(outputId) {
    const output = document.getElementById(outputId).textContent;
    navigator.clipboard.writeText(output).then(() => {
        showNotification('Copied to clipboard!');
    });
}

function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    container.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            notification.remove();
        }, 1000); // 与CSS中transition的时间匹配
    }, 3000);
}

function clearContent(inputId, outputId, copyButtonId) {
    document.getElementById(inputId).value = '';
    document.getElementById(outputId).textContent = '';
    document.getElementById(copyButtonId).style.display = 'none';
}
