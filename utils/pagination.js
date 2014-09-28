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

        if (req.body.options) {
            currentPage = req.body.options.currentPage;
            pageSize = req.body.options.pageSize;

            if (pageSize) {
                query.limit(pageSize);

                if (currentPage) {
                    query.skip((currentPage - 1) * pageSize);
                }

                totalPages = Math.ceil(total / pageSize);
            }
        }

        result = {
            page: {
                totalItems: total,
                totalPages: totalPages,
                currentPage: currentPage
            }
        };

        //        var totalPages = Math.ceil(total / req.body.options.pageSize),
        //
        //            pagination = {
        //
        //                page: {
        //                    totalItems: total,
        //                    totalPages: totalPages,
        //                    currentPage: req.body.options.currentPage
        //                }
        //                //                ,
        //                //                
        //                //                queryOptions: {
        //                //                    skip: ((req.body.options.currentPage - 1) * req.body.options.pageSize),
        //                //                    limit: req.body.options.pageSize
        //                //                }
        //            };

        //        if (req.body.options.sort) {
        //            pagination.queryOptions.sort = req.body.options.sort;
        //        }

        callback(query, result);
    });
};