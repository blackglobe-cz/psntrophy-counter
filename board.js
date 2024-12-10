const fetchData = () => {
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
    return arr
}

const table = `<table style="padding: 16px;color:#fff">
    <thead>
    <tr>
        <td>Count</td>
        <td>Title</td>
        <td>Platinum</td>
    </tr>
    </thead>
    <tbody id="count-table-content">

    </tbody>
</table>`

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

window.onload = () => {
    const data = fetchData()
    const elemDiv = document.createElement('div');
    elemDiv.style.cssText = 'position:fixed;top:80px;right:16px;opacity:0.1;z-index:12;background:#000;';
    elemDiv.onmouseover = () => {elemDiv.style.opacity = 1}
    elemDiv.onmouseout = () => {elemDiv.style.opacity = 0.1}
    elemDiv.innerHTML = table
    document.body.appendChild(elemDiv);
    setDOMInfo(data)
}
