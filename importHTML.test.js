// const {JSDOM} = require('jsdom')
const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './importHTML.html'), 'utf8');

// const {window}=new JSDOM(html);
// global.document=window.document;
// global.window=window;
jest.dontMock('fs'); // not neccessary
describe('$', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString(); // setting the html as string into the document
    });
    afterEach(jest.resetModules);
    it('finds a node', function () {
        const para = document.querySelector('#intro');
        expect(para).toBeTruthy();
    });
});