const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const ong_id = request.headers.authorization;
        const { title, description, value } = request.body;

        const [id] = await connection.table('incidents').insert({
            title,
            description,
            value,
            ong_id});

        return response.json({ id });

    },

    async index(request, response){
        const { page = 1 } = request.query;

        const [ count ] = await connection.table('incidents').count();

        const incidents = await connection.table('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1 ) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json({ incidents });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        
        const incident = await connection.table('incidents').where('id', id).select('*').first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({error: "Esse caso não é da ONG logada"});
        } 

        await connection.table('incidents').where('id', id).delete();
        return response.status(204).send();

    }
}