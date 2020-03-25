const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { ong_id } = request.body;

        const ong = await connection.table('ongs')
            .where('id', ong_id)
            .select('name')
            .first();

        if (!ong){
            response.status(400);
            return response.json({error: 'No ONG found with ID'});
        }

        return response.json({ ong });
    }
}