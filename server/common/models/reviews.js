'use strict';

module.exports = function(Reviews) {

    Reviews.getReviews = function(businessId, cb) {
        let businessQuery = {"where":{"businessId": businessId}}
        Reviews.find( businessQuery, function (err, instance) {
            let allReviews = [];
            instance.map(reviews => allReviews.push(reviews.rating));
            const reviewSum = (accumulator, currentValue) => accumulator + currentValue;
            let averageReviewRating;
            if (allReviews.length == 0) {
                averageReviewRating = 'No Reviews Available'
            } else {
                averageReviewRating = allReviews.reduce(reviewSum) / allReviews.length;
            }
            var response = [...instance, {'averageReviewRating':averageReviewRating}];
            cb(null, response);
            console.log(response);
        });
    }
      
    Reviews.remoteMethod (
        'getReviews',
        {
            http: {path: '/getreview', verb: 'get'},
            accepts: {arg: 'id', type: 'string', required: true, http: { source: 'query' } },
            returns: { arg: 'businessReviews', type: 'array'}
        },
    );
                     
    Reviews.flagReview = function(reviewId, cb) {
        Reviews.find( reviewId, function (err, instance) {
            var response = `This post has been flagged for review` ;
            cb(null, response);
            console.log(response);
        });
    }
      
    Reviews.remoteMethod ( 
        'flagReview',
        {
            http: {path: '/{id}/flagreview', verb: 'put'},
            accepts: {arg: 'id', type: 'string', required: true, http: { source: 'query' } },
            returns: { arg: 'flaggedReview', type: 'string'}
        },
    )
            



    
};
