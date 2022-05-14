export default function handler(req, res){
    //GET any not OK
    if(req.method !== 'POST'){
        res.status(405).end();
    }

    //POST - ok
    //validar credentials
    if(req.body.password === process.env.PASSWORD){
        const user = {
            name: "Hazael Jimenez",
            image: 'https://res.cloudinary.com/hazadev01/image/upload/v1631742591/perfil6_uevkkr.jpg'
        }

        return res.status(200).json(user);
    }
    
    res.status(401).end();
};