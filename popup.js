const sanitizeTitle = name => {
    const title = name.replace(/^\/trophies\/\d*-(.*)\/.*$/, '$1').replace(/-/g, ' ');
    return title.charAt(0).toUpperCase() + title.slice(1);
}

const addRow = ({count, title, platinum}, tableRef) => {
    const newRow = tableRef.insertRow();

    const newCellCount = newRow.insertCell(0);
    const newTextCount = document.createTextNode(count);
    newCellCount.appendChild(newTextCount);

    const newCellName = newRow.insertCell(1);
    const newTextName = document.createTextNode(sanitizeTitle(title));
    newCellName.appendChild(newTextName);


    const newCellPlatinum = newRow.insertCell(2);
    const newTextPlatinum = document.createTextNode(platinum ? 'Yes' : '');
    newCellPlatinum.appendChild(newTextPlatinum);
};

const setDOMInfo = info => {
    const tableContent = document.getElementById('count-table-content');
    info.forEach(item => addRow(item, tableContent))
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