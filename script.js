// script.js
function convertToJSON(inputId, outputId, copyButtonId) {
    const input = document.getElementById(inputId).value;
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const result = lines.map(line => {
        const parts = line.split(/\s+/);
        return {
            path: parts[3],
            session: parts[4] === 'Session' ? true : false,
            domain: parts[2],
            sameSite: parts[8] || '',
            name: parts[0],
            httpOnly: parts[6] === '✓',
            id: parts[5],
            secure: parts[7] === '✓',
            storeId: parts[9],
            value: parts[1]
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
        alert('Copied to clipboard!');
    });
}
