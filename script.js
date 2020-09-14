chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === 'popup' && msg.subject === 'countInfo') {
        const result = {};
        $('table.zebra tr').each((idx, row) => {
            const item = $(row).find('td:first-child a').attr('href');
            const platinum = $(row).find('td:last-child img').attr('title');

            result[item] = result[item]
                ? {count: result[item].count + 1, platinum: result[item].platinum || platinum === 'Platinum'}
                : {count: 1, platinum: platinum === 'Platinum'}
        });
        const arr = Object.keys(result).map(key => ({
            title: key,
            count: result[key].count,
            platinum: result[key].platinum,
        })).sort((a, b) => b.count - a.count);
        response(arr);
    }
});