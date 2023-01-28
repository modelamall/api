var express = require('express');
var router = express.Router();

const multer = require('multer')

const upload = multer({
    dest: 'uploads/'
}).any()


router.post(
    '/',
    upload,
    (req, res, next) => {
        // req.body
        /**
        [Object: null prototype] {
            code: '5002801556',
            categoryId: '8',
            title: 'National Geographic Aleki Saks Kids Sneaker',
            discription: 'erghcfcfgfcfcn',
            size: [ '36', '40' ],
            price: [ '1000', '1200' ],
            count: [ '3', '4' ],
            colorId: [ '1', '2' ]
        }
        */

        // req.files
        /**
        [
            {
                fieldname: 'pictures[0]',
                originalname: 'iconmonstr-baseball-2.svg',
                encoding: '7bit',
                mimetype: 'image/svg+xml',
                destination: 'uploads/',
                filename: 'b3bf78d763e0520c30dfbe003ad743ce',
                path: 'uploads/b3bf78d763e0520c30dfbe003ad743ce',
                size: 1721
            },
            {
                fieldname: 'pictures[0]',
                originalname: 'iconmonstr-basketball-2.svg',
                encoding: '7bit',
                mimetype: 'image/svg+xml',
                destination: 'uploads/',
                filename: '2dd7757ee0be2cd6fad7e0570594ca82',
                path: 'uploads/2dd7757ee0be2cd6fad7e0570594ca82',
                size: 1203
            },
            {
                fieldname: 'pictures[0]',
                originalname: 'iconmonstr-golf-2.svg',
                encoding: '7bit',
                mimetype: 'image/svg+xml',
                destination: 'uploads/',
                filename: '5bfa5dc9563706bc565e25066577a253',
                path: 'uploads/5bfa5dc9563706bc565e25066577a253',
                size: 993
            },
            {
                fieldname: 'pictures[1]',
                originalname: 'iconmonstr-soccer-1.svg',
                encoding: '7bit',
                mimetype: 'image/svg+xml',
                destination: 'uploads/',
                filename: '63065d0d049d822d25af356483e9e918',
                path: 'uploads/63065d0d049d822d25af356483e9e918',
                size: 1215
            },
            {
                fieldname: 'pictures[1]',
                originalname: 'iconmonstr-volleyball-2.svg',
                encoding: '7bit',
                mimetype: 'image/svg+xml',
                destination: 'uploads/',
                filename: '5e001d1e7cfc0def01a1e032ced086b2',
                path: 'uploads/5e001d1e7cfc0def01a1e032ced086b2',
                size: 877
            }
        ]
         */
})

module.exports = router