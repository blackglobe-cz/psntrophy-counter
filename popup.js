const sanitizeTitle = name => {
    const title = name.replace(/^https:\/\/psnprofiles.com\/trophies\/\d*-(.*)\/.*$/, '$1').replace(/-/g, ' ');
    return title.charAt(0).toUpperCase() + title.slice(1);
}

const addRow = (count, name, tableRef) => {
    const newRow = tableRef.insertRow();
    const newCellName = newRow.insertCell(0);
    const newTextName = document.createTextNode(sanitizeTitle(name));
    newCellName.appendChild(newTextName);

    const newCellCount = newRow.insertCell(0);
    const newTextCount = document.createTextNode(count);
    newCellCount.appendChild(newTextCount);
};

const setDOMInfo = info => {
    const tableContent = document.getElementById('count-table-content');
    info.forEach(item => addRow(item.count, item.title, tableContent))
};

window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'countInfo'},
            // ...also specifying a callback to be called
            //    from the receiving end (content script).
            setDOMInfo);
    });
});