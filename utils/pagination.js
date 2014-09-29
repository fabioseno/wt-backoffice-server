/*global module, rqeuire*/
module.exports.paginate = function (model, req, callback) {
    'use strict';

    var filter = req.body.filter || {};

    model.count(filter, function (err, total) {
        var currentPage,
            pageSize,
            totalPages,
            query = model.find(filter),
            result = {};

        query.find(filter);

        if (req.body.page) {
            currentPage = req.body.page.currentPage;
            pageSize = req.body.page.pageSize;

            if (pageSize) {
                query.limit(pageSize);

                if (currentPage) {
                    query.skip((currentPage - 1) * pageSize);
                }

                totalPages = Math.ceil(total / pageSize);
            }
        }

        if (req.body.sort) {
            query.sort(req.body.sort);
        }

        result = {
            page: {
                totalItems: total,
                totalPages: totalPages,
                currentPage: currentPage
            }
        };

        callback(query, result);
    });
};