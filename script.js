// script.js
function convertToJSON() {
    const input = document.getElementById('input').value;
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const result = lines.map(line => {
        const parts = line.split(/\s+/);
        return {
            name: parts[0],
            value: parts[1],
            domain: parts[2],
            path: parts[3],
            session: parts[4] === 'Session' ? true : false,
            id: parts[5],
            httpOnly: parts[6] === '✓',
            secure: parts[7] === '✓',
            sameSite: parts[8] || '',
            storeId: parts[9]
        };
    });

    document.getElementById('output').textContent = JSON.stringify(result, null, 2);
}
