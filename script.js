chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === 'popup' && msg.subject === 'countInfo') {
        const result = {};
        $('table.zebra tr td:first-child a').each((idx, item) => {
            result[item] = result[item]
                ? result[item] + 1
                : 1
        });
        const arr = Object.keys(result).map(key => ({
            title: key,
            count: result[key]
        })).sort((a, b) => b.count - a.count);
        response(arr);
    }
});