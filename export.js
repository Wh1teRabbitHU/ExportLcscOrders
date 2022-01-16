function crawlPage() {
    const CSVDelimiter = ';';
    const rootElement = document.querySelector('.orderDetailShopList');
    const itemContainers = rootElement.querySelectorAll('.detailShopItem > .itemContent');

    const items = [];

    for (let itemContainer of itemContainers) {
        const leftContentSelector = '.itemContentL > div:nth-child(2)';
        const centerContentSelector = '.itemContentC > div:nth-child(1) > div:nth-child(1) > div';
        const link = "https://lcsc.com" + itemContainer.querySelector(`${leftContentSelector} > div:nth-child(1) a`).getAttribute('href');
        const name = itemContainer.querySelector(`${leftContentSelector} > div:nth-child(2)`).innerText.replace('Mfr.#: ', '');
        const manufacturer = itemContainer.querySelector(`${leftContentSelector} > div:nth-child(3)`).innerText.replace('Mfr: ', '');
        const description = itemContainer.querySelector(`${leftContentSelector} > div:nth-child(4)`).innerText;
        const qty = parseInt(itemContainer.querySelector(centerContentSelector).innerText.replace('Order Qty.: ', '').trim(), 10);
        const linkSplits = link.split('/');
        const category = linkSplits[linkSplits.length - 1].split('_')[0].replaceAll('-', ' ');


        items.push({
            category, manufacturer, name, description, qty, link
        });
    }

    if (items.length === 0) {
        console.log('No items found on the page!');

        return;
    }

    let output = '';

    output += Object.keys(items[0]).reduce((a, b) => a + CSVDelimiter + b) + '\n';

    items.map(item => {
        output += Object.values(item).reduce((a, b) => a + CSVDelimiter + b) + '\n';
    });

    return output;
}

console.log(crawlPage());