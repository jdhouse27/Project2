const axios = require("axios")
const apiKey = "9ZTuDD68Yi8CmDzvrb3hO-qQYAcmgBql8tlVh6aTESCsam16plhzwOoKxKcaMezfSG3qmgobKCtVdxU7jkWtrU7hpQZQgdb2j90pBrltCWjr7uXod3ASbACe4e76XHYx"
const auth = {
    'Authorization': 'Bearer ' + apiKey
}

const Yelp = {
    search: function(term, searchLocation) {
        return axios.get(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${searchLocation}&limit=5`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })

        .then((jsonResponse) => {
            if (jsonResponse.data.businesses) {
                return jsonResponse.data.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        price: business.price,
                        latitude: business.coordinates.latitude,
                        longitude: business.coordinates.longitude
                    };
                })
            } else { return [] }
        })

    }
};

module.exports = Yelp